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
			email = email + "@tw.ibm.com";

			function validateEmail(input) {
			    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(input);
			}
			if(validateEmail(email) == true){
				dispatch(authStart(dispatch, email, serialNumber));
				dispatch(showSpinner());
			}else{
				alert("請輸入正確Email資訊");
				window.location.reload();
			}
			
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
