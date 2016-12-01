import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	SHOW_SPINNER,
	HIDE_SPINNER,
	SET_UI,
	SHOW_ENROLL_MODAL,
	HIDE_ENROLL_MODAL,
} from '../constants/actionTypes';

export const showSpinner = createAction('SHOW_SPINNER');
export const hideSpinner = createAction('HIDE_SPINNER');
export const setUi = createAction('SET_UI');
export const showEnrollModal = createAction('SHOW_ENROLL_MODAL');
export const hideEnrollModal = createAction('HIDE_ENROLL_MODAL');