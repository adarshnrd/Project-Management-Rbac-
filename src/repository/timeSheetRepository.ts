import { TimeSheetModel } from '#models/timeSheetModel';
import { AppDataSource } from '#src/config';
import { Repository } from 'typeorm';

export class TimeSheetRepository {
  private _timeSheetRepository: Repository<TimeSheetModel>;
  constructor() {
    this._timeSheetRepository = AppDataSource.getRepository(TimeSheetModel);
  }

  public async save(timeSheetModel: TimeSheetModel) {
    await this._timeSheetRepository.save(timeSheetModel);
  }
  //   public async find()
}
