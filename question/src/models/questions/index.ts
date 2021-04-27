import {Question} from './types';
import { logger } from '../../logger';
import { QuestionModel } from './model';

async function create(question: Question): Promise<void> {
	const newQuestion = new QuestionModel(question);
	const result = await newQuestion.save();
	logger.info('Question creating complete');
	logger.info(JSON.stringify(result));
}

async function get(id: string): Promise<Question> {
	return (await QuestionModel.findById(id)) as Question;
}
export {create, get};