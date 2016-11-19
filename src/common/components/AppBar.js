import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// check why use linkcontainer
// class AppBar extends React.Component {
// 	render() {
// 		return (
// 		)
// 	}
// }
const AppBar = ({
	isAuthorized,
	isEnrolled,
	onLogout,
}) => (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>
				<Link to="/">Xmas</Link>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			{
				isAuthorized === false ?
        		(
        		  <Nav pullRight>
        		    <LinkContainer to={{ pathname: '/login' }}><NavItem eventKey={2} href="#">登入</NavItem></LinkContainer>
        		  </Nav>
        		) :
				(						
					isEnrolled === false ?
					(
						<Nav pullRight>
							<LinkContainer to={{ pathname: 'enroll' }}><NavItem eventKey={1} href="#">參加</NavItem></LinkContainer>
							<NavItem eventKey={2} onClick={onLogout} href="#">登出</NavItem>
						</Nav>
					) :
					(
						<Nav pullRight>
							<NavItem eventKey={1} onClick={onLogout} href="#">登出</NavItem>
						</Nav>
					)
															
				)
			}
		</Navbar.Collapse>

	</Navbar>
);

// function renderContent(isAuthorized, isEnrolled) {
// 	if (!isAuthorized) {
// 		return (
// 			<Nav pullRight>
// 				<LinkContainer to={{ pathname: 'login' }}><NavItem eventKey={2} href="#">登入</NavItem></LinkContainer>
// 			</Nav>
// 		);
// 	} else {
// 		return null;
// 	}
// }

export default AppBar;