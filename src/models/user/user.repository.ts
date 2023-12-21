import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EGender, LIMIT, LIMIT_QUERY, PAGE } from 'common/constants/setting';
import { PaginationOptionsInterfaceName } from 'common/pagination';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async findOne(id: string) {
        const query = await this.userRepository.query(
            `
        SELECT u.id, u.username, u.firstName,  u.lastName, u.provider_type, u.address,
            u.avatar, u.gender, u.password, u.email, u.refresh_token
            FROM user u
            Where u.id = ?  LIMIT ${LIMIT}`,
            [id],
        );

        return query;
    }

    async profile(id: string) {
        const query = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.doctorRegister", "doctorRegister")
            .leftJoinAndSelect("user.doctorSpecialized", "doctorSpecialized")
            .leftJoinAndSelect("doctorSpecialized.specialized", "specialized")
            .leftJoinAndSelect("user.feedbackDoctor", "feedbackDoctor")
            .leftJoinAndSelect("user.appointmentDoctor", "appointmentDoctor")
            .leftJoinAndSelect("appointmentDoctor.patient", "patient")
            .leftJoinAndSelect("user.appointmentPatient", "appointmentPatient")
            .where("user.id = :id", { id: id })
            .getOne()

        return { ...query, gender: EGender[query.gender] }

    }

    async queryUsername(username: string) {
        const query = await this.userRepository.query(
            `
             SELECT u.id, u.username, u.password, u.firstName, u.lastName, u.refresh_token, u.isActive
             FROM user u
             WHERE u.username = ? LIMIT ${LIMIT}`,
            [username],
        );

        return query;
    }

    async queryEmail(email: string) {
        const query = await this.userRepository.query(
            `
             SELECT u.id, u.email, u.refresh_token
             FROM user u
             WHERE u.email = ? LIMIT ${LIMIT}`,
            [email],
        );

        return query;
    }

    async queryUsernameAndId(username: string, id: string) {
        const query = await this.userRepository.query(
            `
         		SELECT u.id, u.username, u.refresh_token
         		FROM user u
         		WHERE u.id = ? AND u.username = ?
         	`,
            [id, username],
        );

        return query;
    }

    async registerUser(user: User) {
        const transition =
            await this.userRepository.manager.connection.createQueryRunner();
        const {
            username,
            firstName,
            lastName,
            password,
            email,
            providerType,
            isActive,
            refreshToken,
        } = user;

        await transition.connect();
        await transition.startTransaction();
        try {
            const query = await this.userRepository.query(
                `
                INSERT INTO user (username, firstName, lastName, password, email, provider_type, isActive, refresh_token)
                VALUE (?, ?, ?, ?, ?, ?, ?, ?)
            `,
                [
                    username,
                    firstName,
                    lastName,
                    password,
                    email,
                    providerType,
                    isActive,
                    refreshToken,
                ],
            );


            await transition.commitTransaction();
            return query;
        } catch (error) {
            await transition.rollbackTransaction();
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } finally {
            await transition.release();
        }
    }

    async saveRefreshToken(id: string, refreshToken: string) {
        await this.userRepository.query(
            `
            UPDATE user SET refresh_token = ? WHERE id = ?
        `,
            [refreshToken, id],
        );
    }

    //for authorization
    async getUserRole(id: number) {
        const query = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.userRole", "userRole")
            .leftJoinAndSelect("userRole.role", "role")
            .select(["user.id", "user.firstName", "user.lastName", "userRole.id", "role.id", "role.roleName"])
            .where("user.id = :id", { id })
            .getMany()

        return query;
    }

    async findDoctor(limit: number, page: number) {
        const take = limit;
        const skip = (page - 1) * take;
        const query = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userRole', 'userRole')
            .leftJoinAndSelect('userRole.role', 'role')
            .leftJoinAndSelect('user.doctorRegister', 'doctorRegister')
            .leftJoinAndSelect('user.doctorSpecialized', 'doctorSpecialized')
            .leftJoinAndSelect("user.feedbackDoctor", "feedbackDoctor")
            .leftJoinAndSelect("feedbackDoctor.patient", "patient")
            // .leftJoinAndSelect("user.feedbackPatient", "feedbackPatient")
            .leftJoinAndSelect('doctorSpecialized.specialized', 'specialized')
            .where('doctorRegister.id IS NOT NULL')
            .take(take)
            .skip(skip);

        const results = await query.getMany();
        const total = await query.getCount();

        return { results, total };
    }

    async getOneDoctor(id: number) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userRole', 'userRole')
            .leftJoinAndSelect('userRole.role', 'role')
            .leftJoinAndSelect('user.doctorRegister', 'doctorRegister')
            .leftJoinAndSelect('user.doctorSpecialized', 'doctorSpecialized')
            .leftJoinAndSelect("user.feedbackDoctor", "feedbackDoctor")
            .leftJoinAndSelect("feedbackDoctor.patient", "patient")
            // .leftJoinAndSelect("user.feedbackPatient", "feedbackPatient")
            .leftJoinAndSelect('doctorSpecialized.specialized', 'specialized')
            .where('doctorRegister.id IS NOT NULL')
            .andWhere("user.id = :id", { id })
            .getOne()

        return query;
    }

    async updatePassword(id: number, password: string) {
        return await this.userRepository.query(`
            UPDATE user SET password = ? WHERE id = ?
        `, [password, id])
    }

    async updateField(id: number, fields: string, value: string) {
        return await this.userRepository.query(`
            UPDATE user SET ${fields} = ? WHERE id = ?
        `, [value, id])
    }

    async createPatient(id: number, symptom: string, insurance: string) {
        const query = await this.userRepository.query(`
        UPDATE user SET symptom = ?, insurance = ? WHERE id = ?
        `, [symptom, insurance, id])

        return query;
    }

    async update(id: number, body: UpdateUserDto) {
        const query = await this.userRepository.createQueryBuilder("user")
            .update()
            .set({
                ...body
            })
            .where("user.id = :id", { id })
            .execute()

        return await this.findOne(id.toString());
    }

}
