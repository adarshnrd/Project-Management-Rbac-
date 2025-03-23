import { TimeSheetController } from '#src/controller/timeSheetController';
import { getYearInRange } from '#utils/utils';
import { Router, Request, Response } from 'express';

export const timeLineSheetRouter = Router();
timeLineSheetRouter.get('/timeSheetViewDataPage', (req: Request, res: Response) => {
  const years = getYearInRange(2000);
  return res.render('timeSheetViewDataPage', { years });
});

timeLineSheetRouter.get('/getTimeSheetData', (req: Request, res: Response) => {
  return new TimeSheetController().getTimeSheetData(req, res);
});

timeLineSheetRouter.get('/AddTimeSheetPage', (req: Request, res: Response) => {
  return res.render('timeSheetPage');
});

timeLineSheetRouter.post('/submitTimeline', (req: Request, res: Response) => {
  new TimeSheetController().processTimeSheetData(req, res);
  return;
});
