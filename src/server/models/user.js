import mongoose, { Schema } from 'mongoose';

// var safe = { w: "majority", wtimeout: 10000 }; //check the concept of write concern

export default mongoose.model('User', new Schema({
	id: Schema.Types.ObjectId,
	email: String,
	serialNumber: String,
	isEnrolled: Boolean,
	admin: Boolean,
	isDrawed: Boolean
}));

