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
import { AnswersService } from './answers.service'
import { CreateOrUpdateAnswerDto } from './dto'

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(@Body() createAnswerDto: CreateOrUpdateAnswerDto) {
    return this.answersService.create(createAnswerDto)
  }

  @Get()
  findAll() {
    return this.answersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: CreateOrUpdateAnswerDto
  ) {
    if (!updateAnswerDto.text || !updateAnswerDto.questionId) {
      throw new BadRequestException(
        `missing ${!updateAnswerDto.text ? 'text' : 'questionId'}`
      )
    }
    return this.answersService.update(updateAnswerDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(id)
  }
}
