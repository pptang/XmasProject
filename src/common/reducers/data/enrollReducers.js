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
	ENROLL_COMPLETE: (state) => (
		state.merge({
			isEnrolled: true,
		})
	),
	ENROLL_ERROR: (state) => {
		return state;
	},
	SET_GIFT: (state, { payload }) => (
		state.set(payload.key, payload.value)
	),
}, GiftState);

export default giftReducers;