import mongoose from 'mongoose'
import {logger} from '../../logger'

interface IQuestion extends mongoose.Document {
  // This is same field as types/Quesiton without optional types
  _id: string,
	text: string,
	dateCreated: string,
	dateUpdated: string,
	helpful: number,
	notHelpful: number
}
const questionSchema = new mongoose.Schema({
  _id: String, 
  text: String,
  dateCreated: String,
  dateUpdated: String,
  helpful: Number,
  notHelpful: Number
}, {_id: false})
questionSchema.index({_id: true, text: true}, {sparse: true})
questionSchema.on('index', (err) => {
  logger.error('Indexing failed')
  process.kill(process.pid, "SIGINT")
})
const QuestionModel = mongoose.model<IQuestion>('Question', questionSchema)

export {IQuestion, QuestionModel}