import {Router,Request,Response} from "express";

export const signInRouter = Router();

signInRouter.get('/signIn',(req:Request,res:Response)=>{
console.log('hello to signIn');
return res.render('signIn',);
})
