import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid'; // for recipe id

import {
	authComplete,
	authError,
	hideSpinner,
	completeLogout,
	enrollError,
	drawComplete,
	drawError,
	setUser,
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
	login: (dispatch, username, email, serialNumber, phoneNumber) => {
		axios.post('/api/login', {
			username: username,
			email: email,
			serialNumber: serialNumber,
			phoneNumber: phoneNumber
		})
		.then((response) => {
			if (response.data.success === false) {
				dispatch(authError());
				dispatch(hideSpinner());
				alert('發生錯誤，請再試一次！');
				window.location.reload();
			} else {
				if (!document.cookie.token) {
					let d = new Date();
					d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
					const expires = 'expires=' + d.toUTCString();
					document.cookie = 'token=' + response.data.token + '; ' + expires;
					
					dispatch(authComplete({ isEnrolled: response.data.isEnrolled }));
					dispatch(hideSpinner());
					browserHistory.push('/');
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
	enroll: (dispatch, giftname, description) => {
		
		axios.post('/api/enroll', {
			name: giftname,
			description: description,
			token: getCookie("token"),
		})
		.then((response) => {
			if (response.data.success === false) {
				dispatch(enrollError());
			} else {
				
				dispatch(setUser({key: 'isEnrolled', value: true}));
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
			
			console.log("response::::" + JSON.stringify(response));
			if (response.data.success === false) {
				dispatch(drawError());
			} else {		
				
				alert("drawedGift name:" + JSON.stringify(response.data.gift.name));
				alert("drawedGift description:" + JSON.stringify(response.data.gift.description));
				dispatch(drawComplete({name: response.data.gift.name, description: response.data.gift.description}));
				dispatch(hideSpinner());
			}
		})
		.catch(function(error) {
			dispatch(drawError());
		});
	}

};