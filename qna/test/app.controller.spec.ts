import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '/Users/shravan/Documents/projects/qna/qna/src/app.controller'
import { AppService } from '/Users/shravan/Documents/projects/qna/qna/src/app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
