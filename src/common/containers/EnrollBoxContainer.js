import React from 'react';
import { connect } from 'react-redux';
import EnrollBox from '../components/EnrollBox';

import {
	enrollStart,
	showSpinner,
	setUser,
} from '../actions';

export default connect(
	(state) => ({
		giftname: state.getIn(['gift', 'giftname']),
		description: state.getIn(['gift', 'description']),	
	}),
	(dispatch) => ({
		onChangeGiftNameInput: (event) => (
			dispatch(setGift({ key: 'giftname', value: event.target.value }))
		),
		onChangeDescriptionInput: (event) => (
			dispatch(setGift({ key: 'description', value: event.target.value }))
		),
		onEnrollSubmit: (giftname, description) => () => {
			dispatch(enrollStart(dispatch, giftname, description)); //TODO: put token (in cookie) here
			dispatch(showSpinner());
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const { giftname, description } = stateProps;
		const { onEnrollSubmit } = dispatchProps;
		return Object.assign({}, stateProps, dispatchProps, ownProps, {
			onEnrollSubmit: onEnrollSubmit(giftname, description),
		});
	}
)(EnrollBox);