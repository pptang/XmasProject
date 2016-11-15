import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import CheckAuth from '../components/CheckAuth';
import HomePageContainer from '../containers/HomePageContainer';
import LoginPageContainer from '../containers/LoginPageContainer';
import EnrollPageContainer from '../containers/EnrollPageContainer';

export default (
	<Route path='/' component={Main}>
		<IndexRoute component={HomePageContainer} />
		<Route path='/login' component={CheckAuth(LoginPageContainer, 'guest')}/>
		<Route path='/enroll' component={CheckAuth(EnrollPageContainer, 'auth')}/> 
	</Route>
);

// modified enroll component to CheckEnrollStatus -> can't enroll twice