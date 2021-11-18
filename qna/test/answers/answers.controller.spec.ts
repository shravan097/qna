import { Test, TestingModule } from '@nestjs/testing'
import { AnswersController } from '../../src/answers/answers.controller'
import { AnswersService } from '../../src/answers/answers.service'

describe('AnswersController', () => {
  let controller: AnswersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [AnswersService],
    }).compile()

    controller = module.get<AnswersController>(AnswersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
