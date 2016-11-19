import Immutable from 'immutable';

export const UiState = Immutable.fromJS({
	spinnerVisible: false,
	isEdit: false,
});

export const UserState = Immutable.fromJS({
	username: '',
	email: '',
	serialNumber: '',
	phoneNumber: '',
	isEnrolled: false,
	isAuthorized: false,
});

export const GiftState = Immutable.fromJS({
	giftName: '',
	description: '',
});