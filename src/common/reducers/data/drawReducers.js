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
			name: payload.name,
			firstDescription: payload.firstDescription,
			secondDescription: payload.secondDescription,
			thirdDescription: payload.thirdDescription,
		})
	),
	DRAW_ERROR: (state) => {
		
		return state.merge({
			name: '',
			firstDescription: '',
			secondDescription: '',
			thirdDescription: '',
		});
	},
	CLEAN_DRAWED_GIFT: (state, { payload }) => (
		state.merge({
			name: '',
			firstDescription: '',
			secondDescription: '',
			thirdDescription: '',
		})
	),
}, DrawState);

export default giftReducers;