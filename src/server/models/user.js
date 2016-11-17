import mongoose, { Schema } from 'mongoose';
export default mongoose.model('User', new Schema({
	id: Number,
	username: String,
	email: String,
	serialNumber: String,
	phoneNumber: String,
	isEnrolled: Boolean,
	admin: Boolean
}));