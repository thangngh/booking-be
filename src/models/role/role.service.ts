import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleType } from 'common/constants/setting';
@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) { }

    async getRoleInitUser() {
        const queryRole = await this.roleRepository.findOne({
            where: {
                roleName: RoleType['USER']
            }
        })

        return {
            id: queryRole.id,
            roleName: queryRole.roleName
        }
    }
}
