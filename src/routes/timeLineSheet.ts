import { Router, Request, Response } from 'express';

export const timeLineSheetRouter = Router();

timeLineSheetRouter.get('/timeSheetPage', (req: Request, res: Response) => {
  //TODO:- VALIDATION
  return res.render('timeSheetPage');
});

// const timelineEntries = [
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//     {
//       date: '2025-01-20',
//       projectName: 'Project A',
//       workingPosition: 'Developer',
//       description: 'Fixed bugs',
//       hoursSpent: 5,
//     },
//     {
//       date: '2025-01-21',
//       projectName: 'Project B',
//       workingPosition: 'Designer',
//       description: 'Created wireframes',
//       hoursSpent: 3,
//     },
//   ];
//   return res.render('timeSheetPage', { timelineEntries });
