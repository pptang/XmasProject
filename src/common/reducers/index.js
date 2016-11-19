import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import user from './data/userReducers';
import enroll from './data/enrollReducers';
const rootReducer = combineReducers({
	ui,
	user,
	enroll,
});

export default rootReducer;