import { handleActions } from 'redux-actions';
import { UserState } from '../../constants/models';

import {
	AUTH_START,
	AUTH_COMPLETE,
	AUTH_ERROR,
	START_LOGOUT,
	SET_USER,
} from '../../constants/actionTypes';

// check the difference of state.merge and state.set
const userReducers = handleActions({
	AUTH_START: (state) => (
		state.merge({
			isAuthorized: false,
		})
	),
	AUTH_COMPLETE: (state) => (
		state.merge({
			username: '',
			email: '',
			serialNumber: '',
			phoneNumber: '',
			isAuthorized: true,
		})
	),
	AUTH_ERROR: (state) => (
		state.merge({
			username: '',
			email: '',
			serialNumber: '',
			phoneNumber: '',
			isAuthorized: false,
		})
	),
	START_LOGOUT: (state) => (
		state.merge({
			isAuthorized: false,
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