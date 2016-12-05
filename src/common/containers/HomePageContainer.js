import React from 'react';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import moment from 'moment';
import {
	updateTime,
	drawStart,
	showSpinner,
	setAdminConfigStart,
	setAdminConfigState,
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
		isAdmin: state.getIn(['user', 'isAdmin']),
		giftId: state.getIn(['draw', 'giftId']),
		extension: state.getIn(['draw', 'extension']),
		building: state.getIn(['draw', 'building']),
		providerName: state.getIn(['draw', 'providerName']),
		providerPhoneNum: state.getIn(['draw', 'providerPhoneNum']),
		firstDescription: state.getIn(['draw', 'firstDescription']),
		secondDescription: state.getIn(['draw', 'secondDescription']),
		thirdDescription: state.getIn(['draw', 'thirdDescription']),
		exchangedAt: moment(state.getIn(['draw', 'exchangedAt'])).format('YYYY-MM-DD HH:MM'),
		enrollSwitch: state.getIn(['admin', 'enrollSwitch']),
		drawSwitch: state.getIn(['admin', 'drawSwitch']),
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
		onChangeEnrollSwitch: (event) => {
			dispatch(setAdminConfigState({ key: 'enrollSwitch', value: event.target.value }))
		},
		onChangeDrawSwitch: (event) => {
			dispatch(setAdminConfigState({ key: 'drawSwitch', value: event.target.value }))
		},
		onSubmitConfig: (enrollSwitch, drawSwitch) => () => {
			console.log("onSubmitConfig::" + enrollSwitch);
			dispatch(setAdminConfigStart(dispatch, enrollSwitch, drawSwitch));
			dispatch(showSpinner());
		},

	}),
	(stateProps, dispatchProps, ownProps) => {
		const { enrollSwitch, drawSwitch } = stateProps;
		const { onSubmitConfig } = dispatchProps;
		return Object.assign({}, stateProps, dispatchProps, ownProps, {
			onSubmitConfig: onSubmitConfig(enrollSwitch, drawSwitch),
		});
	}
)(HomePage);