import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsService } from '../../src/questions/questions.service'
import { QuestionsController } from '../../src/questions/questions.controller'

describe('QuestionsController', () => {
  let controller: QuestionsController
  let service: QuestionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService]
    }).compile()

    controller = module.get<QuestionsController>(QuestionsController)
    service = module.get<QuestionsService>(QuestionsService)
  })

  afterEach(async () => {
    await service.questionDb.reset()
  })

  it('should create a question', async () => {
    const createRes = await controller.create({
      text: 'test?'
    })
    const readRes = await controller.findOne(createRes.id)
    expect(readRes).toEqual(createRes)
  })

  it('should findAll questions', async () => {
    const createRes1 = await controller.create({
      text: 'test1?'
    })
    const createRes2 = await controller.create({
      text: 'test2?'
    })
    const findAllRes = await controller.findAll()
    expect(findAllRes).toEqual({
      [createRes1.id]: { ...createRes1 },
      [createRes2.id]: { ...createRes2 }
    })
  })

  it('should throw error if missing field on create question', async () => {
    try {
      await controller.create({} as any)
    } catch (e) {
      expect(e.message).toEqual('missing text field')
    }
  })

  it('should delete question', async () => {
    const createRes1 = await controller.create({
      text: 'test1?'
    })
    await controller.remove(createRes1.id)
    const findAllRes = await controller.findAll()
    Object.entries(findAllRes).length
    expect(Object.entries(findAllRes).length).toEqual(0)
  })
})
