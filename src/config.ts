import { config } from 'dotenv';
config();
import { DataSource } from 'typeorm';
import { MODELS, VIEWS } from './models/index';

const env = process.env;

const ENTITIES = MODELS.concat(VIEWS);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST ?? 'localhost',
  port: Number(env.DB_PORT) ?? 3306,
  username: env.DB_USER ?? 'root',
  password: env.DB_PASSWORD ?? 'root',
  database: env.DB_NAME ?? '',
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'debug',
  entities: ENTITIES,
  migrations: env.NODE_ENV === 'production' ? [] : ['migration/*.ts'],
  subscribers: env.NODE_ENV === 'production' ? ['lib/src/subscriber/**/*.js'] : ['src/subscriber/**/*.ts'],
  extra: {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
});
