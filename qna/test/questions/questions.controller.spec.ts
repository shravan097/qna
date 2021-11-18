import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsController } from '../../src/questions/questions.controller'
import { QuestionsService } from '../../src/questions/questions.service'

describe('QuestionsController', () => {
  let controller: QuestionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile()

    controller = module.get<QuestionsController>(QuestionsController)
  })

  it('should be defib vned', () => {
    expect(controller).toBeDefined()
  })
})
