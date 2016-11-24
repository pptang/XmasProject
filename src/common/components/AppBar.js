import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
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
}) => {
	console.log("isAuthorized:" + isAuthorized)
	return (
	<Navbar className="nav">
		<Navbar.Header>
			<Navbar.Brand>				
					<Link to="/" id="homeTitle">Xmas</Link>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			{
				isAuthorized === false ?
        		(
        		  <Nav pullRight>
        		    <LinkContainer to={{ pathname: '/login' }}>
        		    	<NavItem eventKey={2} href="#" id="indexTitle">
        		    		<Button className="indexFrame">
        		    			Login
        		    		</Button>
        		    	</NavItem>
        		    </LinkContainer>
        		  </Nav>
        		) :
				(						
					isEnrolled === false ?
					(
						<Nav pullRight>
							<LinkContainer to={{ pathname: '/enroll' }}>
								<NavItem eventKey={1} href="#" id="indexTitle">
									<Button className="indexFrame">
										Join
									</Button>
								</NavItem>
							</LinkContainer>
							<NavItem eventKey={2} onClick={onLogout} href="#" id="indexTitle">
								<Button className="indexFrame">
									Logout
								</Button>
							</NavItem>
						</Nav>
					) :
					(
						<Nav pullRight>
							<NavItem eventKey={1} onClick={onLogout} href="#" id="indexTitle">
								<Button className="indexFrame">
									Logout
								</Button>
							</NavItem>
						</Nav>
					)
															
				)
			}
		</Navbar.Collapse>

	</Navbar>
)};

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