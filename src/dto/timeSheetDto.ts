import { TimeSheetApiRequest } from '#src/types/timeSheet';

export class TimeSheetDto {
  date: Date;
  projectName: string;
  description: string;
  workingPosition: string;
  hoursSpent: number;
  constructor(timeSheetApiRequest: TimeSheetApiRequest) {
    this.date = new Date(timeSheetApiRequest.date);
    this.projectName = timeSheetApiRequest.projectName;
    this.description = timeSheetApiRequest.description?.trim();
    this.workingPosition = timeSheetApiRequest.workingPosition;
    this.hoursSpent = timeSheetApiRequest.hoursSpent;
  }
}
