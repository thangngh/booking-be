import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';
import { RoleType } from 'common/constants/setting';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>
  ) { }

  async createTransitionSaveRoleUser(user: string, roleId: string) {
    const transition = await this.userRoleRepository.manager.connection.createQueryRunner();


    await transition.connect();
    await transition.startTransaction();

    try {
      const userRole = new UserRole({
        userId: +user,
        roleId: +roleId
      })
      const query = await transition.manager.save(userRole)

      await transition.commitTransaction();
      return query
    } catch (error) {
      await transition.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await transition.release();
    }
  }

  async listRoleUser(user: User) {
    const { id } = user;

    const query = await this.userRoleRepository.find({
      where: {
        userId: id
      },
      relations: ['role']
    })

    const isDoctor = await this.isDoctor(user)

    const isPatient = await this.isPatient(user)

    const result = query.map((data) => ({
      userId: data.userId,
      role: data.role.roleName,

    }))

    return {
      result,
      isDoctor,
      isPatient
    };
  }

  async isDoctor(user: User) {
    const { id } = user;

    const query = await this.userRoleRepository.find({
      where: {
        userId: id,
        role: {
          roleName: RoleType['DOCTOR']
        }
      }
    })

    return query.length > 0
  }

  async isPatient(user: User) {
    const { id } = user;

    const query = await this.userRoleRepository.find({
      where: {
        userId: id,
        role: {
          roleName: RoleType['PATIENT']
        }
      }
    })

    return query.length > 0
  }
}
