import 'mocha'
import {v4 as uuid4} from 'uuid'
import { connectDb, disconnectDb } from '../../../src/util/dbConnect'
import { expect } from 'chai'
import {Questions} from '../../../src/models'
import {Question} from '../../../src/models/questions/types'
import { before } from 'mocha'
import * as dotenv from "dotenv"

describe('Question Model', () => {

  before(async () => {
    dotenv.config()
    await connectDb()
  })

  after(async () => {
    //await Questions.clean()
    await disconnectDb()
  })

  it('should create a valid question record', async () => {
    const _id = uuid4()
    const sampleQuestion: Question = {
      _id,
      text: 'This is a test question',
      dateCreated: '123',
      dateUpdated: '345',
      helpful: 1,
      notHelpful: 2,
    }
    await Questions.create(sampleQuestion)
    const actual = await Questions.getById(sampleQuestion._id)
    expect(actual).to.eql(sampleQuestion)
  })

  xit('should get text question record', async () => {
    const _id = uuid4()
    const sampleQuestion: Question = {
      _id,
      text: 'This is a test question',
      dateCreated: '123',
      dateUpdated: '345',
      helpful: 1,
      notHelpful: 2,
    }
    await Questions.create(sampleQuestion)
    const actual = await Questions.getById(sampleQuestion._id)
    expect(actual).to.eql(sampleQuestion)
  })
})