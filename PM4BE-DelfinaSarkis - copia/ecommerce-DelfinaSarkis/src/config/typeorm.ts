import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";
import * as path from "path"

dotenvConfig({ path: '.env.development'});

const config = 
    {
        type: 'postgres',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: false,
        logging: true,
        entities: [path.join(__dirname, '../../dist/**/*.entity{.ts,.js}')],
        migrations: [path.join(__dirname, '../../dist/migrations/*{.js,.ts}')],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);