import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	ENROLL_START,
	ENROLL_COMPLETE,
	ENROLL_ERROR,
	SET_GIFT
} from '../constants/actionTypes';

export const enrollStart = createAction('ENROLL_START', WebAPI.enroll);
export const enrollComplete = createAction('ENROLL_COMPLETE');
export const enrollError = createAction('ENROLL_ERROR');
export const setGift = createAction('SET_GIFT');