import Immutable from 'immutable';

export const UiState = Immutable.fromJS({
	spinnerVisible: false,
	modalVisible: false,
	isEdit: false,
});

export const UserState = Immutable.fromJS({
	email: '',
	serialNumber: '',
	isEnrolled: false,
	isAuthorized: false,
});

export const GiftState = Immutable.fromJS({
	giftId: 0,
	extension: '',
	building: '',
	providerName: '',
	providerPhoneNum: '',
	firstDescription: '',
	secondDescription: '',
	thirdDescription: '',
	isExchanged: false,
});

export const TimerState = Immutable.fromJS({
	total: 0,
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
});

export const DrawState = Immutable.fromJS({
	giftId: 0,
	extension: '',
	building: '',
	providerName: '',
	providerPhoneNum: '',
	firstDescription: '',
	secondDescription: '',
	thirdDescription: '',
	exchangedAt: '',
});