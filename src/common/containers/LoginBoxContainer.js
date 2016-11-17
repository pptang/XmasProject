import React from 'react';
import { connect } from 'react-redux';
import LoginBox from '../components/LoginBox';

import {
	authStart,
	showSpinner,
	setUser,
} from '../actions';

export default connect(
	(state) => ({
		username: state.getIn(['user', 'username']),
		email: state.getIn(['user', 'email']),
		serialNumber: state.getIn(['user', 'serialNumber']),
		phoneNumber: state.getIn(['user', 'phoneNumber']),
	}),
	(dispatch) => ({
		onChangeUsernameInput: (event) => (
			dispatch(setUser({ key: 'username', value: event.target.value }))
		),
		onChangeEmailInput: (event) => (
			dispatch(setUser({ key: 'email', value: event.target.value }))
		),
		onChangeSerialNumberInput: (event) => (
			dispatch(setUser({ key: 'serialNumber', value: event.target.value }))
		),
		onChangePhoneNumberInput: (event) => (
			dispatch(setUser({ key: 'phoneNumber', value: event.target.value }))
		),
		onLoginSubmit: (username, email, serialNumber, phoneNumber) => () => {/* check the syntax here */
			dispatch(authStart(dispatch, username, email, serialNumber, phoneNumber));
			dispatch(showSpinner());
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const { username, email, serialNumber, phoneNumber } = stateProps;
		const { onLoginSubmit } = dispatchProps;
		return Object.assign({}, stateProps, dispatchProps, ownProps, {
			onLoginSubmit: onLoginSubmit(username, email, serialNumber, phoneNumber),
		});
	} // wtf?
)(LoginBox);