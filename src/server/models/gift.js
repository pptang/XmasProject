import mongoose, { Schema } from 'mongoose';
import AutoIncrement from 'mongoose-sequence';
const GiftSchema = mongoose.Schema({
	giftId: Number,
	extension: String,
	building: String,
	providerName: String,
	providerPhoneNum: String,
	firstDescription: String,
	secondDescription: String,
	thirdDescription: String,
	providerId: Schema.Types.ObjectId,
	newOwnerId: Schema.Types.ObjectId,
	enrolledAt: Date,
	isExchanged: Boolean,
	exchangedAt: Date
});
GiftSchema.plugin(AutoIncrement, {inc_field: 'giftId'});
export default mongoose.model('Gift', GiftSchema);