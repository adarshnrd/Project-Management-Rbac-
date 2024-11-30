import { Request, Response } from 'express';

export default class SignIn {
  constructor() {}

  //need to move to middleware
  public async validateLogin(req: Request, res: Response) {
    const { email, password } = req.body as any;
    //now we have to validate the email and pass from here and use encryption and decryption.
    console.log(email + ' ' + password);
  }
}
