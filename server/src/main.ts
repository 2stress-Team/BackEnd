import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import { Entities } from './entities';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import chalk from 'chalk';
require('dotenv').config();

const PORT = process.env.PORT || 3000
if (process.env.DB_DEV_URL == null)
	throw new Error(chalk.red.bold(`DB_DEV_URL is required in .env file`));

const databaseUrl: string = process.env.DB_DEV_URL as string;

const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

const typeOrmOptions: PostgresConnectionOptions = {
	type: 'postgres',
	host: connectionOptions.host as string,
	port:
		connectionOptions.port == null
			? 5432
			: (Number.parseInt(connectionOptions.port) as number),
	username: connectionOptions.user as string,
	password: connectionOptions.password as string,
	database: connectionOptions.database as string,
	synchronize: true,
	logging: false,
	entities: Entities,
	extra: {
		ssl: process.env.DB_DEV_SSL === 'true' ? true : false,
	},
};

createConnection(typeOrmOptions)
	.then(() => {
		app.listen(PORT, function() {
			console.log(chalk.bold.magenta(`💫  Server is running on port ${PORT}!`));
		});
	})
	.catch(error => console.log(error));
