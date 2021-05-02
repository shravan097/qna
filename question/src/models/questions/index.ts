import { logger } from '../../logger'
import { IQuestion, QuestionModel } from './model'
import { Question } from './types'

async function create(question: Question): Promise<void> {
  await (new QuestionModel(question)).save()
  logger.debug('question created', JSON.stringify(question))
}

async function getById(id: string): Promise<IQuestion> {
  const record: IQuestion = 
  (await QuestionModel.findById(id).lean().select('-__v')) as IQuestion
  logger.debug(`get for id ${id}`, JSON.stringify(record))
  return record
}

async function getByText(text: string): Promise<IQuestion> {
  const record: IQuestion = 
  (await QuestionModel.findOne({text}).lean().select('-__v')) as IQuestion
  logger.debug(`get for text ${text}`, JSON.stringify(record))
  return record
}

// For Test Cleanup only
async function clean(): Promise<void> {
  await QuestionModel.deleteMany({})
  logger.debug('Cleaning DB complete')
}
export {create, getById, getByText, clean, IQuestion}