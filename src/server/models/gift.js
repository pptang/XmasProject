import mongoose, { Schema } from 'mongoose';
export default mongoose.model('Gift', new Schema({
	id: Number,
	name: String,
	description: String,
	providerId: Number,
	newOwnerId: Number,
	enrolledAt: Date,
	isExchanged: Boolean,
	exchangedAt: Date

}))