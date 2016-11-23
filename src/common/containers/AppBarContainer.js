import React from 'react';
import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import { browserHistory } from 'react-router';

import {
	startLogout,
	setUi,
	cleanDrawedGift,
} from '../actions';

export default connect(
	(state) => ({
		isAuthorized: state.getIn(['user', 'isAuthorized']),
		isEnrolled: state.getIn(['user', 'isEnrolled']),
	}),
	(dispatch) => ({
		onLogout: () => {
			dispatch(startLogout(dispatch));
			dispatch(cleanDrawedGift());
		},
	})
)(AppBar);