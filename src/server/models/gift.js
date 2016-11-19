import mongoose, { Schema } from 'mongoose';
export default mongoose.model('Gift', new Schema({
	id: Number,
	name: String,
	description: String,
	providerId: Schema.Types.ObjectId,
	newOwnerId: Schema.Types.ObjectId,
	enrolledAt: Date,
	isExchanged: Boolean,
	exchangedAt: Date

}))