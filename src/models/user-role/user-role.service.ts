import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { User } from 'models/user/entities/user.entity';
import { RoleType } from 'common/constants/setting';
import { RoleService } from 'models/role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService
  ) { }

  async createTransitionSaveRoleUser(user: User, roleId: string) {
    const transition = await this.userRoleRepository.manager.connection.createQueryRunner();


    await transition.connect();
    await transition.startTransaction();

    try {
      const userRole = new UserRole({
        userId: user?.id,
        roleId: +roleId
      })
      const query = await transition.manager.save(userRole)
      // const recipe = await queryRunner.manager.save(recipeIns);

      // recipe && this.userRecipeService.create({
      //   userId: user.id,
      //   recipeId: recipe.id
      // });

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
      ...result,
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

  async createRole(user: User, role: RoleType) {
    const { id } = user;
    const getRoleId = await this.roleService.getRoleByName(role)

    const query = await this.userRoleRepository.createQueryBuilder()
      .insert()
      .into(UserRole)
      .values({
        userId: id,
        roleId: getRoleId.id
      })
      .execute()

    return query && {
      message: 'Successful !'
    }
  }
}
