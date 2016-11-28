import { handleActions } from 'redux-actions';
import { DrawState } from '../../constants/models';

import {
	DRAW_START,
	DRAW_COMPLETE,
	DRAW_ERROR,
	CLEAN_DRAWED_GIFT,
} from '../../constants/actionTypes';

const giftReducers = handleActions({
	DRAW_START: (state) => {
		return state;
	},
	DRAW_COMPLETE: (state, { payload }) => (		
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
	DRAW_ERROR: (state) => {
		alert("禮物已抽完，請洽管理員！");
		return state.merge({
			giftId: 0,
			extension: '',
			building: '',
			providerName: '',
			providerPhoneNum: '',
			firstDescription: '',
			secondDescription: '',
			thirdDescription: '',
		});
	},
	CLEAN_DRAWED_GIFT: (state, { payload }) => (
		state.merge({
			giftId: 0,
			extension: '',
			building: '',
			providerName: '',
			providerPhoneNum: '',
			firstDescription: '',
			secondDescription: '',
			thirdDescription: '',
		})
	),
}, DrawState);

export default giftReducers;