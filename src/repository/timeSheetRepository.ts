import { TimeSheetModel } from '#models/timeSheetModel';
import { AppDataSource } from '#src/config';
import { Between, InsertResult, Repository } from 'typeorm';

export class TimeSheetRepository {
  private _timeSheetRepository: Repository<TimeSheetModel>;
  constructor() {
    this._timeSheetRepository = AppDataSource.getRepository(TimeSheetModel);
  }

  public async addAndUpdate(timeSheetModel: TimeSheetModel): Promise<InsertResult> {
    return await this._timeSheetRepository.upsert(timeSheetModel, ['date', 'user']);
  }

  public async getTimeSheetData(email: string, year: number, month: number): Promise<TimeSheetModel[]> {
    return await this._timeSheetRepository.find({
      where: {
        user: {
          email: email,
        },
        date: Between(new Date(`${year}-${month}-01`), new Date(`${year}-${month}-31`)),
      },
    });
  }
}
