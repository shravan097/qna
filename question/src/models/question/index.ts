import {Question} from './types';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'tslog';
import { QuestionModel } from './model';

const log: Logger = new Logger();

// TODO: Write Test
const question: Question = {
    id: uuidv4(),
    text: 'What is the price overall?',
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    helpful: 0,
    notHelpful: 0
};

export async function create(): Promise<void> {
    const newQuestion = new QuestionModel(question);
    const result = await newQuestion.save();
    log.info('Question creating complete');
    log.info(JSON.stringify(result));
}
