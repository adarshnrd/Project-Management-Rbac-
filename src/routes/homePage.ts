import { Request, Response, Router } from 'express';

export const homePageRouter = Router();

homePageRouter.get('/homePage', (req: Request, res: Response) => {
  return res.render('homePage');
});
