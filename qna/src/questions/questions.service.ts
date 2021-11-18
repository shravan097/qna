import { Injectable } from '@nestjs/common'
import { CreateOrUpdateQuestionDto } from './../../src/questions/dto'
import { QuestionDb, QuestionDbFactory } from './database'

@Injectable()
export class QuestionsService {
  questionDb: QuestionDb

  constructor() {
    this.questionDb = QuestionDbFactory.getQuestionDb('memory')
  }

  async create(createQuestionDto: CreateOrUpdateQuestionDto) {
    return this.questionDb.createOrUpdate(createQuestionDto)
  }

  async findOne(id: string) {
    return this.questionDb.read(id)
  }

  update(updateQuestionDto: CreateOrUpdateQuestionDto) {
    return this.questionDb.createOrUpdate(updateQuestionDto)
  }

  remove(id: string) {
    return this.questionDb.delete(id)
  }
}
