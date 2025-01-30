import "reflect-metadata";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
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
});

dataSource.initialize();

export default dataSource; 