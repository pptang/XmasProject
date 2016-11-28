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
		giftId: state.getIn(['draw', 'giftId']),
		extension: state.getIn(['draw', 'extension']),
		building: state.getIn(['draw', 'building']),
		providerName: state.getIn(['draw', 'providerName']),
		providerPhoneNum: state.getIn(['draw', 'providerPhoneNum']),
		firstDescription: state.getIn(['draw', 'firstDescription']),
		secondDescription: state.getIn(['draw', 'secondDescription']),
		thirdDescription: state.getIn(['draw', 'thirdDescription']),
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