import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid'; // for recipe id

import {
	authComplete,
	authError,
	hideSpinner,
	completeLogout,
	enrollComplete,
	enrollError,
	drawComplete,
	drawError,
	setUser,
	setAdminConfigStart,
	setAdminConfigComplete,
	setAdminConfigError,
} from '../actions';

function getCookie(keyName) {
	var name = keyName + '=';
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}
	return "";
}

export default {
	login: (dispatch, email, serialNumber) => {

		axios.post('/api/login', {
			email: email,
			serialNumber: serialNumber
		})
		.then((response) => {
			if (response.data.success === false) {
				dispatch(authError());
				dispatch(hideSpinner());
				//alert('發生錯誤，請再試一次！');
				alert(response.data.message);
				window.location.reload();
			} else {
				if (!document.cookie.token) {
					let d = new Date();
					//d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
					d.setTime(d.getTime() + (5 * 60 * 1000));
					const expires = 'expires=' + d.toUTCString();
					document.cookie = 'token=' + response.data.token + '; ' + expires;
					
					dispatch(authComplete({ 
						isEnrolled: response.data.isEnrolled,
						isAdmin: response.data.isAdmin,
					}));
					dispatch(hideSpinner());
					window.location.reload();
					// browserHistory.push('/');
				}
			}
		})
		.catch(function (error) {
			dispatch(authError());
		});
	},
	logout: (dispatch) => {
		document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		dispatch(hideSpinner());
		browserHistory.push('/');
	},
	checkAuth: (dispatch, token) => {
		axios.post('/api/authenticate', {
			token: token,
		})
		.then((response) => {
			if (response.data.success === false) {
				dispatch(authError());
			} else {
				dispatch(authComplete());
			}
		})
		.catch(function (error) {
			dispatch(authError());
		});
	},
	enroll: (dispatch, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription) => {
		
		axios.post('/api/enroll', {
			extension: extension,
			building: building,
			providerName: providerName,
			providerPhoneNum: providerPhoneNum,
			firstDescription: firstDescription,
			secondDescription: secondDescription,
			thirdDescription: thirdDescription,
			token: getCookie("token"),
		})
		.then((response) => {
			if (response.data.success === false) {
				dispatch(enrollError());
			} else {
				console.log("bible:" + response.data.enrolledGift.giftId);
				
				dispatch(setUser({key: 'isEnrolled', value: true}));
				dispatch(enrollComplete({
					giftId: response.data.enrolledGift.giftId,
					extension: response.data.enrolledGift.extension,
					building: response.data.enrolledGift.building,
					providerName: response.data.enrolledGift.providerName,
					providerPhoneNum: response.data.enrolledGift.providerPhoneNum,
					firstDescription: response.data.enrolledGift.firstDescription,
					secondDescription: response.data.enrolledGift.secondDescription,
					thirdDescription: response.data.enrolledGift.thirdDescription,
					isExchanged: response.data.enrolledGift.isExchanged,
				}));
				dispatch(hideSpinner());
			}
		})
		.catch(function(error) {
			dispatch(enrollError());
		});
	},

	draw: (dispatch) => {
		axios.post('/api/draw', {
			token: getCookie("token"),
		})
		.then((response) => {
			//TODO: 現在有錯誤都會跳沒有禮物，要做區分
			console.log("response::::" + JSON.stringify(response));
			if (response.data.success === false) {
				dispatch(drawError());
			} else {		
				
				dispatch(drawComplete({
					giftId: response.data.gift.giftId,
					extension: response.data.gift.extension,
					building: response.data.gift.building,
					providerName: response.data.gift.providerName,
					providerPhoneNum: response.data.gift.providerPhoneNum,
					firstDescription: response.data.gift.firstDescription,
					secondDescription: response.data.gift.secondDescription,
					thirdDescription: response.data.gift.thirdDescription,
					exchangedAt: response.data.gift.exchangedAt,
				}));
				dispatch(hideSpinner());
			}
		})
		.catch(function(error) {
			dispatch(drawError());
		});
	},

	setAdminConfig: (dispatch, enrollSwitch, drawSwitch) => {
		axios.post('/api/setAdminConfig', {
			enrollSwitch: enrollSwitch,
			drawSwitch: drawSwitch,
			token: getCookie("token"),
		})
		.then((response) => {
			if (response.data.success === false) {
				dispatch(setAdminConfigError());
			} else {
				dispatch(setAdminConfigComplete({
					enrollSwitch: response.data.enrollSwitch,
					drawSwitch: response.data.drawSwitch,
				}));
				dispatch(hideSpinner());
				
			}
		})
		.catch(function(error) {
			
			dispatch(setAdminConfigError());
		});
	}

};
