import express, { Application, Request, Response } from 'express';

import { config } from 'dotenv';
import path from 'path';

import router from './routes';

config();
const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello To ProjectManagement' });
  return;
});

app.use(router);

app.listen(port, () => {
  console.log(`Server started on port ${port} `);
});
