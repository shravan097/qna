import { NotFoundException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { CreateOrUpdateQuestionDto, Question } from '../dto'

export interface QuestionDb {
  read(id: string): Promise<Question>
  createOrUpdate(param: CreateOrUpdateQuestionDto): Promise<Question>
  delete(id: string): Promise<void>
  findAll(): Promise<{ [id: string]: Question }>
}

export class MemoryQuestionDb implements QuestionDb {
  memoryDb: { [id: string]: Question }

  constructor() {
    this.memoryDb = {}
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
}

// @todo(sd): Use @Injectable here for this
export class SingletonMemoryQuestionDb {
  readonly gMemoryQuestionDb: QuestionDb
  constructor() {
    if (!this.gMemoryQuestionDb) {
      this.gMemoryQuestionDb = new MemoryQuestionDb()
    }
  }
  static getMemoryQuestionDb(): QuestionDb {
    return new SingletonMemoryQuestionDb().gMemoryQuestionDb
  }
}

export const DbType = 'memory'

export class QuestionDbFactory {
  static getQuestionDb(dbType: typeof DbType) {
    if (dbType === 'memory') {
      return SingletonMemoryQuestionDb.getMemoryQuestionDb()
    }
  }
}
