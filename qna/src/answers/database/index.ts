import { NotFoundException } from '@nestjs/common'
import { DbFactory } from '../../dbFactory'
import { v4 as uuidv4 } from 'uuid'
import { CreateOrUpdateAnswerDto, Answer } from '../dto'

export const serviceName = 'answers'

export interface AnswersDb {
  read(id: string): Promise<Answer>
  createOrUpdate(param: CreateOrUpdateAnswerDto): Promise<Answer>
  delete(id: string): Promise<void>
  findAll(): Promise<{ [id: string]: Answer }>
  reset(): Promise<void>
}

export class MemoryAnswerDb implements AnswersDb {
  memoryDb: { [id: string]: Answer }

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
  
  async reset() {
    this.memoryDb = {}
  }
}

export const DbType = 'memory'

// @todo(sd): Use @Injectable here for this
export class AnswerDbFactory {
  static gMemoryAnswerDb: AnswersDb
  static getAnswerDb(dbType: typeof DbType) {
    if (dbType === 'memory') {
      if (!AnswerDbFactory.gMemoryAnswerDb) {
        AnswerDbFactory.gMemoryAnswerDb = new MemoryAnswerDb()
      }
      return AnswerDbFactory.gMemoryAnswerDb
    }
  }
}
