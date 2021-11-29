import { Test, TestingModule } from '@nestjs/testing'
import { AnswersService } from '../../src/answers/answers.service'
import { AnswersController } from '../../src/answers/answers.controller'
import { QuestionsController } from '../../src/questions/questions.controller'
import { QuestionsService } from '../../src/questions/questions.service'

describe('AnswersController', () => {
  let answerController: AnswersController
  let answerService: AnswersService
  let questionController: QuestionsController
  let questionService: QuestionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController, QuestionsController],
      providers: [AnswersService, QuestionsService]
    }).compile()

    answerController = module.get<AnswersController>(AnswersController)
    answerService = module.get<AnswersService>(AnswersService)
    questionController = module.get<QuestionsController>(QuestionsController)
    questionService = module.get<QuestionsService>(QuestionsService)
  })

  afterEach(async () => {
    await answerService.answerDb.reset()
    await questionService.questionDb.reset()
  })

  it('should create a answer', async () => {
    await questionController.update('1', {
      text: 'test question'
    })
    const createRes = await answerController.create({
      text: 'test?',
      questionId: '1'
    })
    const readRes = await answerController.findOne(createRes.id)
    expect(readRes).toEqual(createRes)
  })

  it('should throw error if missing field on create answer', async () => {
    try {
      await answerController.create({} as any)
    } catch (e) {
      expect(e.message).toEqual('missing text field')
    }
  })

  it('should findAll answers', async () => {
    await questionController.update('1', {
      text: 'test question'
    })
    const createRes1 = await answerController.create({
      text: 'test1',
      questionId: '1'
    })
    const createRes2 = await answerController.create({
      text: 'test2',
      questionId: '1'
    })
    const findAllRes = await answerController.findAll()
    expect(findAllRes).toEqual({
      [createRes1.id]: { ...createRes1 },
      [createRes2.id]: { ...createRes2 }
    })
  })

  it('should delete answer', async () => {
    await questionController.update('1', {
      text: 'test question'
    })
    const createRes1 = await answerController.create({
      text: 'test1',
      questionId: '1'
    })
    await answerController.remove(createRes1.id)
    const findAllRes = await answerController.findAll()
    Object.entries(findAllRes).length
    expect(Object.entries(findAllRes).length).toEqual(0)
  })
})
