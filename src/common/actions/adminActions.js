import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	SET_ADMIN_CONFIG_START,
	SET_ADMIN_CONFIG_COMPLETE,
	SET_ADMIN_CONFIG_ERROR,
	SET_ADMIN_CONFIG_STATE,
} from '../constants/actionTypes';

export const setAdminConfigStart = createAction('SET_ADMIN_CONFIG_START', WebAPI.setAdminConfig);
export const setAdminConfigComplete = createAction('SET_ADMIN_CONFIG_COMPLETE');
export const setAdminConfigError = createAction('SET_ADMIN_CONFIG_ERROR');
export const setAdminConfigState = createAction('SET_ADMIN_CONFIG_STATE');

