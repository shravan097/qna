import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateOrUpdateQuestionDto } from './dto'

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateOrUpdateQuestionDto) {
    if (!createQuestionDto.text) {
      throw new BadRequestException()
    }
    return this.questionsService.create(createQuestionDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id)
  }

  @Get()
  findAll() {
    return this.questionsService.findAll()
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: CreateOrUpdateQuestionDto
  ) {
    if (!updateQuestionDto.text) {
      throw new BadRequestException()
    }
    return this.questionsService.update({ id, ...updateQuestionDto })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id)
  }
}