import { TimeSheetDto } from '../dto/timeSheetDto';
import { TimeSheetModel } from '../models/timeSheetModel';
import { TimeSheetService } from '../service/timeSheetService';
import { getYearInRange, sendErrorResponseWithErrorRenderPage } from '../utils/utils';
import { Request, Response } from 'express';
import PmContext from '#src/helper/pmContext';
import { HOME_PAGE_URL } from '#src/constant';
import { ERROR_CODES_MESSAGE } from '#src/constant/error';
import { TimeSheetViewApiResponse } from '#src/types/timeSheet';
export class TimeSheetController {
  private _timeSheetService: TimeSheetService;
  private _pmContext: PmContext;
  constructor() {
    this._timeSheetService = new TimeSheetService();
    this._pmContext = new PmContext();
  }
  public async getTimeSheetData(req: Request, res: Response) {
    const bodyData = req.query as unknown as TimeSheetViewApiResponse;
    const years = getYearInRange(2000);
    const userEmail = (req.session as any)?.user?.username;
    if (!userEmail) {
      return sendErrorResponseWithErrorRenderPage(
        res,
        401,
        ERROR_CODES_MESSAGE[401],
        undefined,
        undefined,
        HOME_PAGE_URL,
      );
    }
    const timelineEntries = await this._timeSheetService.getTimeSheetData(userEmail, bodyData.year, bodyData.month);
    const timeLineDataFilter = timelineEntries.map((data) => {
      return {
        date: data.date,
        projectName: data.projectName,
        workingPosition: data.workingPosition,
        description: data.description,
        hoursSpent: data.hoursSpent,
      };
    });
    return res.render('timeSheetViewDataPage', { years, timelineEntries: timeLineDataFilter });
  }

  public async processTimeSheetData(req: Request, res: Response) {
    try {
      const reqBody = req.body;
      const timeSheetDto = new TimeSheetDto(reqBody);
      const newTimeSheetModel: TimeSheetModel = new TimeSheetModel();
      newTimeSheetModel.date = timeSheetDto.date;
      newTimeSheetModel.projectName = timeSheetDto.projectName;
      newTimeSheetModel.description = timeSheetDto.description;
      newTimeSheetModel.workingPosition = timeSheetDto.workingPosition;
      newTimeSheetModel.hoursSpent = timeSheetDto.hoursSpent;
      const userEmail = (req.session as any)?.user?.username;
      const user = await this._pmContext.userService.getUserData(userEmail);
      if (!user) {
        return sendErrorResponseWithErrorRenderPage(
          res,
          401,
          ERROR_CODES_MESSAGE[401],
          undefined,
          undefined,
          HOME_PAGE_URL,
        );
      }
      newTimeSheetModel.user = user;
      await this._timeSheetService.addAndUpdate(newTimeSheetModel);
      return res.render('timeSheetPage');
    } catch (error) {
      this._pmContext.logger.error({
        error,
        message: 'Error in processing time sheet data.',
      });
      return sendErrorResponseWithErrorRenderPage(
        res,
        500,
        ERROR_CODES_MESSAGE[500],
        undefined,
        undefined,
        HOME_PAGE_URL,
      );
    }
  }
}
