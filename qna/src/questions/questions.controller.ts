import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateOrUpdateQuestionDto } from './dto'

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateOrUpdateQuestionDto) {
    return this.questionsService.create(createQuestionDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: CreateOrUpdateQuestionDto
  ) {
    return this.questionsService.update(updateQuestionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id)
  }
}
