import { handleActions } from 'redux-actions';
import { UserState } from '../../constants/models';

import {
	AUTH_START,
	AUTH_COMPLETE,
	AUTH_ERROR,
	START_LOGOUT,
	SET_USER,
} from '../../constants/actionTypes';

const userReducers = handleActions({
	AUTH_START: (state) => (
		state.merge({
			isAuthorized: false,
		})
	),
	AUTH_COMPLETE: (state, { payload }) => {
		
		return state.merge({
			email: '',
			serialNumber: '',
			isAuthorized: true,
			isEnrolled: payload.isEnrolled,
			isAdmin: payload.isAdmin,
		})
	},
	AUTH_ERROR: (state) => (
		state.merge({
			email: '',
			serialNumber: '',
			isAuthorized: false,
			isAdmin: false,
		})
	),
	START_LOGOUT: (state) => (
		state.merge({
			isAuthorized: false,
			isAdmin: false,
		})
	),
	CHECK_AUTH: (state) => (
		state.set('isAuthorized', true)
	),
	SET_USER: (state, { payload }) => (
		state.set(payload.key, payload.value)
	),
}, UserState);

export default userReducers;