
import {Request, Response} from 'express';
import {Questions} from '../models';
import {logger} from '../logger';
import * as Status from 'http-status';
import { Question } from '../models/questions/types';
import { validate } from 'uuid';
import { stat } from 'fs';

function validateRequest(req:Request, res: Response): void {
	if(! req.body) {
		logger.warn(`Bad Request ${JSON.stringify(req.body)}`);
		res.send(Status.BAD_REQUEST);
	}
	// TODO: Validate req.body with schema
    
}
async function getQuestion(req:Request, res: Response): Promise<void>
{
	validateRequest(req,res);
	let question: Question;
	// Sample Testing
	// TODO: Need to create controllers for GET
	try{
		question = await Questions.get(req.params.id);
	} catch (err) {
		const detail = 'Id not found';
		logger.info({status: Status.NOT_FOUND, detail});
		res.status(Status.NOT_FOUND).send({detail});
		return;
	}
	res.status(Status.OK).send(question);
}

async function postQuestion (req:Request, res:Response): Promise<void> 
{  
	validateRequest(req,res);
	try{
		await Questions.create(req.body as Question);
	} catch (err) {
		const detail = 'Something went wrong when posting question';
		logger.info({status: Status.INTERNAL_SERVER_ERROR, detail});
		res.status(Status.INTERNAL_SERVER_ERROR).send({detail});
		return;
	}
    
}

export {getQuestion, postQuestion};