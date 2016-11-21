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

export const TimerState = Immutable.fromJS({
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
});

export const DrawState = Immutable.fromJS({
	drawedGift: '',
});