import express, { Application, Request, Response } from 'express';

import { config } from 'dotenv';
import path from 'path';

import router from './routes';
import { AppDataSource } from './config';
import { APP_PORT } from './constant';

config();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'views'))); //  "public" off of current is root

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello To ProjectManagement' });
  return;
});

app.use(router);

(async function () {
  await AppDataSource.initialize();
})();

app.listen(APP_PORT, () => {
  console.log(`Server started on port http://localhost:${APP_PORT} `);
});
