
import {Request, Response} from 'express';


export async function getQuestions(req:Request, res: Response): Promise<string >{
    
    await Promise.reject(new Error('this is awful'));
    res.status(200).json({'message':'works great'});
    return Promise.resolve('success');
}
