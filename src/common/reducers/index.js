import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import user from './data/userReducers';
import enroll from './data/enrollReducers';
import timer from './ui/timerReducers';
import draw from './data/drawReducers';
const rootReducer = combineReducers({
	ui,
	user,
	enroll,
	timer,
	draw,
});

export default rootReducer;