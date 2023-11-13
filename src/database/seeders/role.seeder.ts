import { Role } from "models/role/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class RoleSeeder implements Seeder {
    track?: boolean;
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const roleRepository = dataSource.getRepository(Role)

        const data = ['USER', 'DOCTOR', 'PATIENT'];

        for await (const dt of data) {
            const checkDuplRoleName = await roleRepository.findOneBy({
                roleName: dt
            })

            if (!checkDuplRoleName) {
                await roleRepository.insert([{ roleName: dt }])
            }
        }
    }

}