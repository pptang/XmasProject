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
		email: state.getIn(['user', 'email']),
		serialNumber: state.getIn(['user', 'serialNumber']),
	}),
	(dispatch) => ({
		onChangeEmailInput: (event) => (
			dispatch(setUser({ key: 'email', value: event.target.value }))
		),
		onChangeSerialNumberInput: (event) => (
			dispatch(setUser({ key: 'serialNumber', value: event.target.value }))
		),
		onLoginSubmit: (email, serialNumber) => () => {/* check the syntax here */
			dispatch(authStart(dispatch, email, serialNumber));
			dispatch(showSpinner());
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const { email, serialNumber } = stateProps;
		const { onLoginSubmit } = dispatchProps;
		return Object.assign({}, stateProps, dispatchProps, ownProps, {
			onLoginSubmit: onLoginSubmit(email, serialNumber),
		});
	} // wtf?
)(LoginBox);