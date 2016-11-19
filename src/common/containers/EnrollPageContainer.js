import React from 'react';
import { connect } from 'react-redux';
import EnrollPage from '../components/EnrollPage';

export default connect(
	(state) => ({
		spinnerVisible: state.getIn(['ui', 'spinnerVisible']),
	}),
	(dispatch) => ({

	})
)(EnrollPage);