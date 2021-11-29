import { Injectable, NotFoundException } from '@nestjs/common'
import { DbFactory } from '../../dbFactory'
import { v4 as uuidv4 } from 'uuid'
import { CreateOrUpdateQuestionDto, Question } from '../dto'

export interface QuestionDb {
  read(id: string): Promise<Question>
  createOrUpdate(param: CreateOrUpdateQuestionDto): Promise<Question>
  delete(id: string): Promise<void>
  findAll(): Promise<{ [id: string]: Question }>
  /** Used for testing purpose only */
  reset(): Promise<void>
}
export const serviceName = 'questions'

@Injectable()
export class MemoryQuestionDb implements QuestionDb {
  memoryDb: { [id: string]: Question }

  constructor() {
    this.memoryDb = DbFactory.getDb(serviceName)
  }

  async read(id: string) {
    if (!this.memoryDb[id]) {
      throw new NotFoundException()
    }
    return this.memoryDb[id]
  }

  async findAll() {
    return this.memoryDb
  }

  async createOrUpdate(param: CreateOrUpdateQuestionDto) {
    const { id, text } = param
    if (id) {
      this.memoryDb[id] = { id, text }
      return this.memoryDb[id]
    }
    const uuid = uuidv4()
    this.memoryDb[uuid] = { id: uuid, text }
    return this.memoryDb[uuid]
  }

  async delete(id: string) {
    delete this.memoryDb[id]
    return
  }

  async reset() {
    this.memoryDb = {}
  }
}

export const DbType = 'memory'

// @todo(sd): Use @Injectable here for this
export class QuestionDbFactory {
  static gMemoryQuestionDb
  static getQuestionDb(dbType: typeof DbType) {
    if (dbType === 'memory') {
      if (!QuestionDbFactory.gMemoryQuestionDb) {
        QuestionDbFactory.gMemoryQuestionDb = new MemoryQuestionDb()
      }
      return QuestionDbFactory.gMemoryQuestionDb
    }
  }
}
