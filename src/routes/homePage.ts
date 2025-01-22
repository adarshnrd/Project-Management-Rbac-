import SignIn from '#src/controller/signIn';
import { Request, Response, Router } from 'express';

export const homePageRouter = Router();

homePageRouter.get('/homePage', async (req: Request, res: Response) => {
  if (req.session && (req.session as any)?.user) {
    if (await new SignIn().sessionUserValidation(req, res)) {
      return res.render('homePage');
    }
    return res.render('signIn');
  } else {
    return res.render('signIn');
  }
});

homePageRouter.get('/homeDefaultPage', (req: Request, res: Response) => {
  return res.render('homeDefaultPage');
});

//TODO:- will implement it later when project is complete.
// homePageRouter.get('/profile', (req: Request, res: Response) => {
//   const userData = {
//     user: {
//       firstName: 'Adarsh',
//       lastName: 'V',
//       email: 'adarsh@mindpathtech.com',
//       role: 'Organization Admin',
//       companyName: 'mindpathtech-10',
//       language: 'English',
//       timeZone: '(GMT+05:30) Chennai',
//       facebook: 'https://facebook.com/adarshv',
//       linkedin: 'https://linkedin.com/in/adarshv',
//       twitter: 'https://twitter.com/adarshv',
//     },
//   };
//   return res.render('profilePage', userData);
// });

// homePageRouter.get('/profileEdit1', (req: Request, res: Response) => {
//   const dummyUserData = {
//     user: {
//       firstName: 'Adarsh',
//       middleName: '',
//       lastName: 'V',
//       workNumber: '',
//       mobileNumber: '9876543210',
//       companyName: 'mindpathtech-10',
//       jobTitle: 'Software Engineer',
//       language: 'English',
//       timeZone: 'GMT+05:30',
//       facebook: 'https://facebook.com/adarsh',
//       linkedin: 'https://linkedin.com/in/adarsh',
//       twitter: 'https://twitter.com/adarsh',
//     },
//   };

//   return res.render('editProfilePage', dummyUserData);
// });
