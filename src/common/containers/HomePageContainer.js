import React from 'react';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';

import {
	updateTime,
} from '../actions';

export default connect(
	(state) => ({
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
				days: time.days,
				hours: time.hours,
				minutes: time.minutes,
				seconds: time.seconds,
			}))
		),
	})
)(HomePage);