import { handleActions } from 'redux-actions';
import { GiftState } from '../../constants/models';

import {
	ENROLL_START,
	ENROLL_COMPLETE,
	ENROLL_ERROR,
	SET_GIFT,
} from '../../constants/actionTypes';

const giftReducers = handleActions({
	ENROLL_START: (state) => {
		return state;
	},
	ENROLL_COMPLETE: (state, { payload }) => (
		state.merge({
			giftId: payload.giftId,
			extension: payload.extension,
			building: payload.building,
			providerName: payload.providerName,
			providerPhoneNum: payload.providerPhoneNum,
			firstDescription: payload.firstDescription,
			secondDescription: payload.secondDescription,
			thirdDescription: payload.thirdDescription,
		})
	),
	ENROLL_ERROR: (state) => (
		state.merge({
			extension: '',
			building: '',
			providerName: '',
			providerPhoneNum: '',
			firstDescription: '',
			secondDescription: '',
			thirdDescription: '',
		})
	),
	SET_GIFT: (state, { payload }) => (
		state.set(payload.key, payload.value)
	),
}, GiftState);

export default giftReducers;