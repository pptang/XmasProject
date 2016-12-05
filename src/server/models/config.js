import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Config', new Schema({
	enrollSwitch: Boolean,
	drawSwitch: Boolean,
}));

