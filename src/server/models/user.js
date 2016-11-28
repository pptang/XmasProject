import mongoose, { Schema } from 'mongoose';
export default mongoose.model('User', new Schema({
	id: Schema.Types.ObjectId,
	email: String,
	serialNumber: String,
	isEnrolled: Boolean,
	admin: Boolean,
	isDrawed: Boolean
}));