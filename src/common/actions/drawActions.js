import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	DRAW_START,
	DRAW_COMPLETE,
	DRAW_ERROR,
	CLEAN_DRAWED_GIFT
} from '../constants/actionTypes';

export const drawStart = createAction('DRAW_START', WebAPI.draw);
export const drawComplete = createAction('DRAW_COMPLETE');
export const drawError = createAction('DRAW_ERROR');
export const cleanDrawedGift = createAction('CLEAN_DRAWED_GIFT');