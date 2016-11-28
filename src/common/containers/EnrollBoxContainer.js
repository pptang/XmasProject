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
		extension: state.getIn(['enroll', 'extension']),
		building: state.getIn(['enroll', 'building']),
		providerName: state.getIn(['enroll', 'providerName']),
		providerPhoneNum: state.getIn(['enroll', 'providerPhoneNum']),
		firstDescription: state.getIn(['enroll', 'firstDescription']),
		secondDescription: state.getIn(['enroll', 'secondDescription']),
		thirdDescription: state.getIn(['enroll', 'thirdDescription']),
		isEnrolled: state.getIn(['user', 'isEnrolled']),
	}),
	(dispatch) => ({
		onChangeExtensionInput: (event) => (
			dispatch(setGift({ key: 'extension', value: event.target.value }))
		),
		onChangeBuildingInput: (event) => (
			dispatch(setGift({ key: 'building', value: event.target.value }))
		),
		onChangeProviderNameInput: (event) => (
			dispatch(setGift({ key: 'providerName', value: event.target.value }))
		),
		onChangeProviderPhoneNumInput: (event) => (
			dispatch(setGift({ key: 'providerPhoneNum', value: event.target.value }))
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
		onEnrollSubmit: (extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription) => () => {
			dispatch(enrollStart(dispatch, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription)); 
			dispatch(showSpinner());
		},
		goBackToIndex: () => {
			browserHistory.push('/');
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const { extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription } = stateProps;
		const { onEnrollSubmit } = dispatchProps;
		return Object.assign({}, stateProps, dispatchProps, ownProps, {
			onEnrollSubmit: onEnrollSubmit(extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription),
		});
	}
)(EnrollBox);