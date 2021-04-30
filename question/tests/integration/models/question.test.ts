import 'mocha';
import {v4 as uuid4} from 'uuid';
import { connectDb, disconnectDb } from '../../../src/util/dbConnect';
import { expect } from 'chai';
import {Questions} from '../../../src/models';
import {Question} from '../../../src/models/questions/types';
import { before } from 'mocha';
import * as dotenv from "dotenv";

describe('Question Model', () => {

  before(async () => {
    dotenv.config();
    await connectDb();
  });

  after(async () => {
    await Questions.clean();
    await disconnectDb();
  });

  it('should create a valid question record', async () => {
    const sampleQuestion: Question = {
      text: 'This is a test question',
      dateCreated: '123',
      dateUpdated: '345',
      helpful: 1,
      notHelpful: 2,
    };
    const record = await Questions.create(sampleQuestion);
    expect(record).to.exist;
    const actual = await Questions.get(record._id);
    expect(JSON.stringify(actual)).to.eql(JSON.stringify(record));
  });
});