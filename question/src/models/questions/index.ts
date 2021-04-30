import { logger } from '../../logger';
import { IQuestion, QuestionModel } from './model';
import { Question } from './types';

async function create(question: Question): Promise<IQuestion> {
	const newQuestion = new QuestionModel(question);
	const result = await newQuestion.save();
	logger.debug('question created');
	return result;
}

async function get(id: string): Promise<IQuestion> {
	const record: IQuestion = (await QuestionModel.findById(id)) as IQuestion;
	logger.debug(`get for ${id}`);
	return record;
}

// For Test Cleanup only
async function clean(): Promise<void> {
	await QuestionModel.deleteMany({});
	logger.debug('Cleaning DB complete');
}
export {create, get, clean, IQuestion};