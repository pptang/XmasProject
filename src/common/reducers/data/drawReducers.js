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
			description: payload.description,
		})
	),
	DRAW_ERROR: (state) => {
		alert("沒有禮物了，請洽管理員！");
		return state.merge({
			name: '',
			description: '',
		});
	},
	CLEAN_DRAWED_GIFT: (state, { payload }) => (
		state.merge({
			name: '',
			description: '',
		})
	),
}, DrawState);

export default giftReducers;