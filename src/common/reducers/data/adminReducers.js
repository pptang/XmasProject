import { handleActions } from 'redux-actions';
import { AdminState } from '../../constants/models';

import {
	SET_ADMIN_CONFIG_START,
	SET_ADMIN_CONFIG_COMPLETE,
	SET_ADMIN_CONFIG_ERROR,
	SET_ADMIN_CONFIG_STATE,
} from '../../constants/actionTypes';

const adminReducers = handleActions({
	SET_ADMIN_CONFIG_START: (state) => (
		state.merge({
			enrollSwitch: true,
			drawSwitch: true,
		})
	),
	SET_ADMIN_CONFIG_COMPLETE: (state, { payload }) => {
		alert("設定成功");
		return state.merge({
			enrollSwitch: payload.enrollSwitch,
			drawSwitch: payload.drawSwitch,
		});
	},
	SET_ADMIN_CONFIG_ERROR: (state) => {
		alert("設定錯誤");
		return state.merge({			
			enrollSwitch: true,
			drawSwitch: true,
		});
	},	
	SET_ADMIN_CONFIG_STATE: (state, { payload }) => (
		state.set(payload.key, payload.value)
	),
}, AdminState);

export default adminReducers;