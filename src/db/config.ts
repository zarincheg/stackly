import { DataSource, DataSourceOptions } from "typeorm";
//import { entities } from './entities';

let dataSource: DataSource;

export const connection: DataSourceOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
    entities: ['./entities/*.{ts,js}'],
    migrations: ['./migrations/*.{ts,js}'],
    synchronize: false
}

export async function getDataSource() {
    if (!dataSource) {
        dataSource = new DataSource(connection);
    }

    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }

    return dataSource;
}