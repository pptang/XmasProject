import { handleActions } from 'redux-actions';
import { TimerState } from '../../constants/models';

import {
	UPDATE_TIME,
} from '../../constants/actionTypes';

const timerReducers = handleActions({
	
	UPDATE_TIME: (state, { payload }) => (
		state.merge({
			'days': payload.days,
			'hours': payload.hours,
			'minutes': payload.minutes,
			'seconds': payload.seconds,
		})
	),
}, TimerState);

export default timerReducers;