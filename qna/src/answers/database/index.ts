import { NotFoundException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { CreateOrUpdateAnswerDto, Answer } from '../dto'

export interface AnswersDb {
  read(id: string): Promise<Answer>
  createOrUpdate(param: CreateOrUpdateAnswerDto): Promise<Answer>
  delete(id: string): Promise<void>
  findAll(): Promise<{ [id: string]: Answer }>
}

export class MemoryAnswerDb implements AnswersDb {
  memoryDb: { [id: string]: Answer }

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

  async createOrUpdate(param: CreateOrUpdateAnswerDto) {
    const { id, text, questionId } = param
    if (id) {
      this.memoryDb[id] = { id, text, questionId }
      return this.memoryDb[id]
    }
    const uuid = uuidv4()
    this.memoryDb[uuid] = { id: uuid, text, questionId }
    return this.memoryDb[uuid]
  }

  async delete(id: string) {
    delete this.memoryDb[id]
    return
  }
}

// @todo(sd): Use @Injectable here for this
export class SingletonMemoryAnswersDb {
  readonly gMemoryAnswerDb: AnswersDb
  constructor() {
    if (!this.gMemoryAnswerDb) {
      this.gMemoryAnswerDb = new MemoryAnswerDb()
    }
  }
  static getMemoryAnswerDb(): AnswersDb {
    return new SingletonMemoryAnswersDb().gMemoryAnswerDb
  }
}

export const DbType = 'memory'

export class AnswerDbFactory {
  static getAnswerDb(dbType: typeof DbType) {
    if (dbType === 'memory') {
      return SingletonMemoryAnswersDb.getMemoryAnswerDb()
    }
  }
}
