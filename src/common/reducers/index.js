import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import user from './data/userReducers';

const rootReducer = combineReducers({
	ui,
	user,
});

export default rootReducer;