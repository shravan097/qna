import { NotFoundException } from '@nestjs/common'
import { QuestionDbFactory } from '../../src/questions/database'

describe('QuestionDb', () => {
  const allDb = [QuestionDbFactory.getQuestionDb('memory')]
  allDb.forEach((db) => {
    it('should be create/read', async () => {
      const sampleQuestion = {
        text: 'How can I install this ?',
      }
      const createResponse = await db.createOrUpdate(sampleQuestion)
      const readResponse = await db.read(createResponse.id)
      expect(readResponse).toEqual(createResponse)
      db.delete(createResponse.id)
    })
    it('should update if it already exists', async () => {
      const sampleQuestion = {
        text: 'How can I install this ?',
      }
      const createResponse = await db.createOrUpdate(sampleQuestion)
      const secondCreateResponse = await db.createOrUpdate({
        ...createResponse,
        text: 'This is different',
      })
      expect(secondCreateResponse).toEqual({
        ...createResponse,
        text: 'This is different',
      })
      expect(createResponse.id).toEqual(secondCreateResponse.id)
      await db.delete(createResponse.id)
      await expect(db.read(createResponse.id)).rejects.toThrow(
        NotFoundException
      )
    })
  })
})
