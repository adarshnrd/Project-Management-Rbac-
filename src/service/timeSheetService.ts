import { TimeSheetModel } from '#models/timeSheetModel';
import { TimeSheetRepository } from '#src/repository/timeSheetRepository';

export class TimeSheetService {
  private _timeSheetRepository: TimeSheetRepository;
  constructor() {
    this._timeSheetRepository = new TimeSheetRepository();
  }
  public async addAndUpdate(timeSheetModel: TimeSheetModel): Promise<void> {
    return await this._timeSheetRepository.addAndUpdate(timeSheetModel);
  }

  public async getTimeSheetData(email: string, year: number, month: number): Promise<TimeSheetModel[]> {
    return await this._timeSheetRepository.getTimeSheetData(email, year, month);
  }
}
