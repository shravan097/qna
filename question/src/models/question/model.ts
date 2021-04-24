import mongoose from 'mongoose';
import { Question } from './types';
const questionSchema = new mongoose.Schema({
    id: String,
    text: String,
    dateCreated: String,
    dateUpdated: String,
    helpful: Number,
    notHelpful: Number
});
const QuestionModel = mongoose.model<Question & mongoose.Document>('Question', questionSchema);

export {QuestionModel};