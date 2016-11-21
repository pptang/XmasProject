import React from 'react';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';

import {
	updateTime,
	drawStart,
	showSpinner,
} from '../actions';

export default connect(
	(state) => ({
		total: state.getIn(['timer', 'total']),
		days: state.getIn(['timer', 'days']),
		hours: state.getIn(['timer', 'hours']),
		minutes: state.getIn(['timer', 'minutes']),
		seconds: state.getIn(['timer', 'seconds']),
		isAuthorized: state.getIn(['user', 'isAuthorized']),
		isEnrolled: state.getIn(['user', 'isEnrolled']),
	}),
	(dispatch) => ({
		updateDisplayTime: (time) => (
			dispatch(updateTime({
				total: time.total,
				days: time.days,
				hours: time.hours,
				minutes: time.minutes,
				seconds: time.seconds,
			}))
		),
		onDraw: () => {
			dispatch(drawStart(dispatch));
			dispatch(showSpinner());
		},

	})
)(HomePage);