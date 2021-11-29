import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Put
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateOrUpdateQuestionDto } from './dto'

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateOrUpdateQuestionDto) {
    if (!createQuestionDto.text) {
      throw new BadRequestException('missing text field')
    }
    return await this.questionsService.create(createQuestionDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionsService.findOne(id)
  }

  @Get()
  async findAll() {
    return await this.questionsService.findAll()
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: CreateOrUpdateQuestionDto
  ) {
    if (!updateQuestionDto.text) {
      throw new BadRequestException('Missing text field')
    }
    return await this.questionsService.update({ id, ...updateQuestionDto })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionsService.remove(id)
  }
}
