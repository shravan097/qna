import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException
} from '@nestjs/common'
import { QuestionsService } from '../questions/questions.service'
import { AnswersService } from './answers.service'
import { CreateOrUpdateAnswerDto } from './dto'

@Controller('answers')
export class AnswersController {
  questionService: QuestionsService
  constructor(private readonly answersService: AnswersService) {
    this.questionService = new QuestionsService()
  }

  @Post()
  async create(@Body() createAnswerDto: CreateOrUpdateAnswerDto) {
    const { text, questionId } = createAnswerDto
    if (!text || !questionId) {
      throw new BadRequestException(
        `missing ${!createAnswerDto.text ? 'text' : 'questionId'} field`
      )
    }
    await this.questionService.findOne(questionId)
    return await this.answersService.create(createAnswerDto)
  }

  @Get()
  async findAll() {
    return await this.answersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.answersService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnswerDto: CreateOrUpdateAnswerDto
  ) {
    const { text, questionId } = updateAnswerDto
    if (!text || !questionId) {
      throw new BadRequestException(
        `missing ${!updateAnswerDto.text ? 'text' : 'questionId'}`
      )
    }
    // Check if question exists
    await this.questionService.findOne(questionId)
    return await this.answersService.update({ id, ...updateAnswerDto })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.answersService.remove(id)
  }
}
