
import {Request, Response} from 'express';
import {Question} from '../models';
import {Status} from './types';

export async function getQuestions(req:Request, res: Response): Promise<number>
{
    // Sample Testing
    // TODO: Need to create controllers for GET
    await Question.create();
    res.status(200).json({'message':'works great'});
    return Status.SUCCESS;
}