import Immutable from 'immutable';

export const UiState = Immutable.fromJS({
	spinnerVisible: false,
	isEdit: false,
});

export const UserState = Immutable.fromJS({
	username: '',
	email: '',
	password: '',
	isAuthorized: false,
});