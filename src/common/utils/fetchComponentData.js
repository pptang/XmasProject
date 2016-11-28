import axios from 'axios';
export default function fetchComponentData(token = 'token') {
	// const promises = [axios.get('http://localhost:3000/api/recipes'), axios.get('http://localhost:3000/api/authenticate?token=' + token)];
	const promises = [
		axios.get('http://localhost:3000/api/authenticate?token=' + token), 
		axios.get('http://localhost:3000/api/getMyGift?token=' + token),
		axios.get('http://localhost:3000/api/getEnrolledGift?token=' + token),	
	];
	return Promise.all(promises);
}