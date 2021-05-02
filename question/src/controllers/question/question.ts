
import {Request, Response} from 'express'
import {_Request} from '../types'
import {Questions} from '../../models'
import {logger} from '../../logger'
import Ajv, { SchemaObject } from 'ajv'
import * as Status from 'http-status'
import { Question } from '../../models/questions/types'
import * as Schema from './schema'

const ajv = new Ajv()

function validateRequest(req:_Request, res: Response): void {
  if(!req.body) {
    logger.warn(`Bad Request ${JSON.stringify(req.body)}`)
    res.send(Status.BAD_REQUEST)
  }
  if (!req.schema) {
    logger.warn('Schema not provided. Skipping schema validation of the request')
  }
  if (! ajv.validate(req.schema as SchemaObject, req.query)) {
    throw Error('invalid request')
  } 
}
async function getQuestion(req:Request, res: Response): Promise<void>
{
  let question: Question
  try{
    validateRequest({
      ...req,
      schema: Schema.getRequestSchema
    } as _Request,res)
    question = req.query.id ? (await Questions.getById(req.query.id as string)):
      (await Questions.getByText(req.query.text as string))
    if (!question) {
      throw Error('query failed')
    }
  } catch (err) {
    logger.info({status: Status.NOT_FOUND,'detail': err.message})
    res.status(Status.NOT_FOUND).send({'detail': err.message})
    return
  }
  res.status(Status.OK).send(question)
}

async function postQuestion (req:Request, res:Response): Promise<void> 
{  
  validateRequest(req as _Request,res)
  try{
    await Questions.create(req.body as Question)
  } catch (err) {
    const detail = 'Something went wrong when posting question'
    logger.info({status: Status.INTERNAL_SERVER_ERROR, detail})
    res.status(Status.INTERNAL_SERVER_ERROR).send({detail})
    return
  }
    
}

export {getQuestion, postQuestion}