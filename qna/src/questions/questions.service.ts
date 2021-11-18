import { Injectable } from '@nestjs/common'
import { CreateOrUpdateQuestionDto } from './../../src/questions/dto'

@Injectable()
export class QuestionsService {
  create(createQuestionDto: CreateOrUpdateQuestionDto) {
    return 'This action adds a new question'
  }

  findAll() {
    return `This action returns all questions`
  }

  findOne(id: number) {
    return `This action returns a #${id} question`
  }

  update(id: number, updateQuestionDto: CreateOrUpdateQuestionDto) {
    return `This action updates a #${id} question`
  }

  remove(id: number) {
    return `This action removes a #${id} question`
  }
}
