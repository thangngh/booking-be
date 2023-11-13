import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LIMIT, LIMIT_QUERY, PAGE } from "common/constants/setting";
import { PaginationOptionsInterfaceName } from "common/pagination";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async findOne(id: string) {
        const query = await this.userRepository.query(`
        SELECT u.id, u.username, u.firstName,  u.lastName, u.provider_type, u.address,
            u.avatar, u.gender, u.password, u.email, u.refresh_token
            FROM user u
            Where u.id = ?  LIMIT ${LIMIT}`, [id])

        return query;
    }

    async queryUsername(username: string) {
        const query = await this.userRepository.query(`
             SELECT u.id, u.username, u.password, u.firstName, u.lastName, u.refresh_token, u.isActive
             FROM user u
             WHERE u.username = ? LIMIT ${LIMIT}`, [username]);

        return query;
    }

    async queryEmail(email: string) {
        const query = await this.userRepository.query(`
             SELECT u.id, u.email, u.refresh_token
             FROM user u
             WHERE u.email = ? LIMIT ${LIMIT}`, [email]);

        return query;
    }

    async queryUsernameAndId(username: string, id: string) {
        const query = await this.userRepository
            .query(`
         		SELECT u.id, u.username, u.refresh_token
         		FROM user u
         		WHERE u.id = ? AND u.username = ?
         	`, [id, username])

        return query;
    }

    async registerUser(user: User) {
        const transition = await this.userRepository.manager.connection.createQueryRunner();
        const { username, firstName, lastName, password, email, providerType, isActive, refreshToken } = user

        await transition.connect();
        await transition.startTransaction();
        try {

            const query = await this.userRepository.query(`
                INSERT INTO user (username, firstName, lastName, password, email, provider_type, isActive, refresh_token)
                VALUE (?, ?, ?, ?, ?, ?, ?, ?)
            `, [username, firstName, lastName, password, email, providerType, isActive, refreshToken])

            return query

            await transition.commitTransaction();
        } catch (error) {
            await transition.rollbackTransaction();
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } finally {
            await transition.release();
        }

    }

    async saveRefreshToken(id: string, refreshToken: string) {
        await this.userRepository.query(`
            UPDATE user SET refresh_token = ? WHERE id = ?
        `, [refreshToken, id])

    }

    // async findAllUserRoleDoctor({ limit = LIMIT_QUERY, page = PAGE }: PaginationOptionsInterfaceName) {
    //     const query = await this.userRepository.query(`
    //         SELECT * FROM user JOIN user-role ON user.id = user-role.userId
    //     `, [limit, page])
    // }

}