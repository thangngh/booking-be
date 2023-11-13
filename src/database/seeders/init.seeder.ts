import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { RoleSeeder } from './role.seeder';
import roleFactory from 'database/factories/role.factory';
import { SpecializedSeeder } from './specialized.seeder';
import specializedFactory from 'database/factories/specialized.factory';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [
        RoleSeeder,
        SpecializedSeeder
      ],
      factories: [
        roleFactory,
        specializedFactory
      ],
    });
  }
}
