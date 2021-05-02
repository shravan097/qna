import { SchemaObject } from 'ajv'

const getRequestSchema: SchemaObject =  {
  type: 'object',
  properties: {
    'id': {
      type: 'string'
    },
    'text': {
      type: 'string'
    },
  },
  'oneOf': [
    {'required': ['id']},
    {'required': ['text']}
  ],
  additionalProperties: false
}
export {getRequestSchema}