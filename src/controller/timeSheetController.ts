import { getYearInRange } from '#utils/utils';
import { Request, Response } from 'express';

export class TimeSheetController {
  constructor() {}
  public async getTimeSheetData(req: Request, res: Response) {
    const bodyData = req.query;
    console.log(bodyData);
    //TODO:- we will get data from DB and parse and send to user in this format.
    const years = getYearInRange(2000);
    //dummy Data
    const timelineEntries = [
      {
        date: '2025-01-20',
        projectName: 'Project A',
        workingPosition: 'Developer',
        description: 'Fixed bugs',
        hoursSpent: 5,
      },
      {
        date: '2025-01-20',
        projectName: 'Project A',
        workingPosition: 'Developer',
        description: 'Fixed bugs',
        hoursSpent: 5,
      },
    ];
    return res.render('timeSheetViewDataPage', { years, timelineEntries });
  }
  public async processTimeSheetData(req: Request, res: Response) {
    const reqBody = req.body;
    console.log(reqBody);
  }
}

// {
//   date: '2025-01-16',
//   projectName: 'Jarvis',
//   workingPosition: 'dfdfd',
//   description: 'sdfds',
//   hoursSpent: '2'
// }
