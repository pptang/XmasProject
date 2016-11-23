import React from 'react';
import { connect } from 'react-redux';
import EnrollBox from '../components/EnrollBox';
import { browserHistory } from 'react-router';
import {
	enrollStart,
	showSpinner,
	setGift,
} from '../actions';

export default connect(
	(state) => ({
		giftname: state.getIn(['enroll', 'giftname']),
		firstDescription: state.getIn(['enroll', 'firstDescription']),
		secondDescription: state.getIn(['enroll', 'secondDescription']),
		thirdDescription: state.getIn(['enroll', 'thirdDescription']),
		isEnrolled: state.getIn(['user', 'isEnrolled']),
	}),
	(dispatch) => ({
		onChangeGiftNameInput: (event) => (
			dispatch(setGift({ key: 'giftname', value: event.target.value }))
		),
		onChangeFirstDescriptionInput: (event) => (
			dispatch(setGift({ key: 'firstDescription', value: event.target.value }))
		),
		onChangeSecondDescriptionInput: (event) => (
			dispatch(setGift({ key: 'secondDescription', value: event.target.value }))
		),
		onChangeThirdDescriptionInput: (event) => (
			dispatch(setGift({ key: 'thirdDescription', value: event.target.value }))
		),
		onEnrollSubmit: (giftname, firstDescription, secondDescription, thirdDescription) => () => {
			dispatch(enrollStart(dispatch, giftname, firstDescription, secondDescription, thirdDescription)); 
			dispatch(showSpinner());
		},
		goBackToIndex: () => {
			browserHistory.push('/');
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const { giftname, firstDescription, secondDescription, thirdDescription } = stateProps;
		const { onEnrollSubmit } = dispatchProps;
		return Object.assign({}, stateProps, dispatchProps, ownProps, {
			onEnrollSubmit: onEnrollSubmit(giftname, firstDescription, secondDescription, thirdDescription),
		});
	}
)(EnrollBox);