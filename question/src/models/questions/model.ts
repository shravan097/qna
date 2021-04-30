import mongoose from 'mongoose';

interface IQuestion extends mongoose.Document {
	text: string,
	dateCreated: string,
	dateUpdated: string,
	helpful: number,
	notHelpful: number
}
const questionSchema = new mongoose.Schema({
	text: String,
	dateCreated: String,
	dateUpdated: String,
	helpful: Number,
	notHelpful: Number
});
const QuestionModel = mongoose.model<IQuestion>('Question', questionSchema);

export {IQuestion, QuestionModel};