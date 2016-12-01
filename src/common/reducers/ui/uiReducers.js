import { handleActions } from 'redux-actions';
import { UiState } from '../../constants/models';

import {
	SHOW_SPINNER,
	HIDE_SPINNER,
	SET_UI,
	SHOW_ENROLL_MODAL,
	HIDE_ENROLL_MODAL,
} from '../../constants/actionTypes';

const uiReducers = handleActions({
	SHOW_SPINNER: (state) => (
		state.set(
			'spinnerVisible',
			true
		)
	),
	HIDE_SPINNER: (state) => (
		state.set(
			'spinnerVisible',
			false
		)
	),
	SET_UI: (state, { payload }) => (
		state.set(payload.key, payload.value)
	),
	SHOW_ENROLL_MODAL: (state) => (
		state.set(
			'modalVisible',
			true
		)
	),
	HIDE_ENROLL_MODAL: (state) => (
		state.set(
			'modalVisible',
			false
		)
	),
}, UiState);

export default uiReducers;