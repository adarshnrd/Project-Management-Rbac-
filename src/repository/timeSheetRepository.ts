import { TimeSheetModel } from '#models/timeSheetModel';
import { AppDataSource } from '#src/config';
import { Between, Repository } from 'typeorm';
import { insertQueryBuilderForModels, upsertForInsertQueryBuilder } from '#utils/typeorm';

export class TimeSheetRepository {
  private _timeSheetRepository: Repository<TimeSheetModel>;
  constructor() {
    this._timeSheetRepository = AppDataSource.getRepository(TimeSheetModel);
  }

  public async addAndUpdate(timeSheetModel: TimeSheetModel): Promise<void> {
    const insertQueryBuilder = insertQueryBuilderForModels([timeSheetModel]);
    const upsertQueryBuilder = upsertForInsertQueryBuilder(TimeSheetModel, insertQueryBuilder, {
      criteriaProperties: ['date', 'userKey', 'projectName'],
    });
    await upsertQueryBuilder.execute();
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
