import React from 'react';
import { connect } from 'react-redux';
import EnrollPage from '../components/EnrollPage';

import { showEnrollModal, hideEnrollModal } from '../actions';

export default connect(
	(state) => ({
		spinnerVisible: state.getIn(['ui', 'spinnerVisible']),
		modalVisible: state.getIn(['ui', 'modalVisible']),
		isEnrolled: state.getIn(['user', 'isEnrolled']),
		giftId: state.getIn(['enroll', 'giftId']),
		extension: state.getIn(['enroll', 'extension']),
		building: state.getIn(['enroll', 'building']),
		providerName: state.getIn(['enroll', 'providerName']),
		providerPhoneNum: state.getIn(['enroll', 'providerPhoneNum']),
		firstDescription: state.getIn(['enroll', 'firstDescription']),
		secondDescription: state.getIn(['enroll', 'secondDescription']),
		thirdDescription: state.getIn(['enroll', 'thirdDescription']),

	}),
	(dispatch) => ({
		onOpenModal: () => (
			dispatch(showEnrollModal())
		),
		onCloseModal: () => (
			dispatch(hideEnrollModal())
		),
	})
)(EnrollPage);