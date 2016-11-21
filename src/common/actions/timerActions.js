import { createAction } from 'redux-actions';

import {
	UPDATE_TIME,
} from '../constants/actionTypes';

export const updateTime = createAction('UPDATE_TIME');