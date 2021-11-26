import { Injectable } from '@nestjs/common'
import { CreateOrUpdateAnswerDto } from './dto'
import { AnswerDbFactory, AnswersDb } from './database'

@Injectable()
export class AnswersService {
  answerDb: AnswersDb

  constructor() {
    this.answerDb = AnswerDbFactory.getAnswerDb('memory')
  }

  async create(createAnswerDto: CreateOrUpdateAnswerDto) {
    return this.answerDb.createOrUpdate(createAnswerDto)
  }

  async findOne(id: string) {
    return this.answerDb.read(id)
  }

  async findAll() {
    return this.answerDb.findAll()
  }

  async update(updateAnswerDto: CreateOrUpdateAnswerDto) {
    return this.answerDb.createOrUpdate(updateAnswerDto)
  }

  async remove(id: string) {
    return this.answerDb.delete(id)
  }
}
