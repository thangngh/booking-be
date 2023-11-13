import InitSeeder from './src/database/seeders/init.seeder';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT as string, 10),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD as string,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: true,
	entities: ['src/**/**.entity{.ts,.js}'],
	migrations: ['dist/database/migrations/*.js'],
	seeds: [InitSeeder],
};

export default new DataSource(options);