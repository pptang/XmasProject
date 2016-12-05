import axios from 'axios';
export default function fetchComponentData(token = 'token') {
	// const promises = [axios.get('http://localhost:3000/api/recipes'), axios.get('http://localhost:3000/api/authenticate?token=' + token)];
	const port = process.env.PORT || 3000;
	const host = process.env.VCAP_APP_HOST || 'localhost';
	const promises = [
		axios.get('http://' + host + ':' + port + '/api/authenticate?token=' + token), 
		axios.get('http://' + host + ':' + port + '/api/getMyGift?token=' + token),
		axios.get('http://' + host + ':' + port + '/api/getEnrolledGift?token=' + token),	
		axios.get('http://' + host + ':' + port + '/api/getAdminConfigStatus?token=' + token),	
	];
	return Promise.all(promises);
}
