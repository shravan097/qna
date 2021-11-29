import { NotFoundException } from '@nestjs/common'
import { AnswerDbFactory } from '../../src/answers/database'

describe('AnswerDb', () => {
  const allDb = [AnswerDbFactory.getAnswerDb('memory')]
  allDb.forEach((db) => {
    it('should be create/read', async () => {
      const sampleAnswer = {
        text: 'How can I install this ?',
        questionId: '12345'
      }
      const createResponse = await db.createOrUpdate(sampleAnswer)
      const readResponse = await db.read(createResponse.id)
      expect(readResponse).toEqual(createResponse)
      db.delete(createResponse.id)
    })
    it('should update if it already exists', async () => {
      const sampleAnswer = {
        text: 'How can I install this ?',
        questionId: '12345'
      }
      const createResponse = await db.createOrUpdate(sampleAnswer)
      const secondCreateResponse = await db.createOrUpdate({
        ...createResponse,
        text: 'This is different'
      })
      expect(secondCreateResponse).toEqual({
        ...createResponse,
        text: 'This is different'
      })
      expect(createResponse.id).toEqual(secondCreateResponse.id)
      await db.delete(createResponse.id)
      await expect(db.read(createResponse.id)).rejects.toThrow(
        NotFoundException
      )
    })
  })
})
