import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../components/Main/Main';
import CheckAuth from '../components/CheckAuth';
import HomePage from '../components/HomePage';
import LoginPageContainer from '../containers/LoginPageContainer';
import EnrollPageContainer from '../containers/EnrollPageContainer';

export default (
	<Route path='/' component={Main}>
		<IndexRoute component={HomePage} />
		<Route path='/login' component={CheckAuth(LoginPageContainer, 'guest')}/>
		<Route path='/enroll' component={EnrollPageContainer}/> 
	</Route>
);

