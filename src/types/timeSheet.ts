export type TimeSheetApiRequest = {
  date: Date;
  projectName: string;
  description: string;
  workingPosition: string;
  hoursSpent: number;
};

export type TimeSheetViewApiResponse = {
  year: number;
  month: number;
};
