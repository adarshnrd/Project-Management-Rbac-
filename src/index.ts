import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

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
app.use(express.static(path.join(__dirname, '..', 'views')));

//session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? `YouCanFindMeButCan'tAchieve`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      maxAge: process.env.SESSION_MAX_AGE ? Number(process.env.SESSION_MAX_AGE) : 24 * 60 * 60 * 1000, // 1 Day in milliseconds
    },
    store: MongoStore.create({
      mongoUrl:
        `${process.env.MONGO_DB_CONNECTION_STRING}${process.env.MONGO_DB_NAME}` ||
        'mongodb://localhost:27017/session-db',
    }),
  }),
);

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
