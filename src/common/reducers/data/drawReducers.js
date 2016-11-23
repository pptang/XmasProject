import { handleActions } from 'redux-actions';
import { DrawState } from '../../constants/models';

import {
	DRAW_START,
	DRAW_COMPLETE,
	DRAW_ERROR,
	SET_DRAWED_GIFT,
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
	DRAW_ERROR: (state) => (
		state.merge({
			name: '',
			description: '',
		})
	),
	SET_DRAWED_GIFT: (state, { payload }) => (
		state.set(payload.key, payload.value)
	),
}, DrawState);

export default giftReducers;