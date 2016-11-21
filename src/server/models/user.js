import mongoose, { Schema } from 'mongoose';
export default mongoose.model('User', new Schema({
	id: Schema.Types.ObjectId,
	username: String,
	email: String,
	serialNumber: String,
	phoneNumber: String,
	isEnrolled: Boolean,
	admin: Boolean,
	isDrawed: Boolean
}));