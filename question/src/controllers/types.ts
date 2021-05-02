import { SchemaObject } from 'ajv'
import {Request} from 'express'

export interface _Request extends Request {
    schema?: SchemaObject
}