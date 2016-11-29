import React from 'react';
import { Button, Image, Panel, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeInterval: 0
		};
			
	}
	componentWillMount() {
		this.updateClock();
		var timeInterval = setInterval(this.updateClock.bind(this), 1000);
		this.setState({
			timeInterval: timeInterval
		})
	}

	updateClock() {
		const deadline = '2016-12-25';		
		var t = getTimeRemaining(deadline);
		this.props.updateDisplayTime({
			total: t.total,
			days: ('0' + t.days).slice(-2),
			hours: ('0' + t.hours).slice(-2),
			minutes: ('0' + t.minutes).slice(-2),
			seconds: ('0' + t.seconds).slice(-2),
		})
		
		if (t.total <= 0) {
			clearInterval(this.state.timeInterval);
		}

		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / (1000 * 60)) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t/ (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}
	}
	
	renderGift(giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription) {
		const title = (
			<h1>抽到的禮物</h1>
		);
		return (
			<Panel header={title} bsStyle="primary">
				
				<Grid>
					<Row className="show-grid">
						<Col sm={4}>分機</Col>
						<Col sm={8}>{extension}</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={4}>所在地</Col>
						<Col sm={8}>{building}</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={4}>姓名</Col>
						<Col sm={8}>{providerName}</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={4}>電話號碼</Col>
						<Col sm={8}>{providerPhoneNum}</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={4}>第一個描述</Col>
						<Col sm={8}>{firstDescription}</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={4}>第二個描述</Col>
						<Col sm={8}>{secondDescription}</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={4}>第三個描述</Col>
						<Col sm={8}>{thirdDescription}</Col>
					</Row>
				</Grid>
				<Button onClick={this.printResult}>列印</Button>
			</Panel>
		);
	}

	printResult() {
		window.print();
	}

	renderDrawBtn(total, isAuthorized, isEnrolled, onDraw) {
		if (isAuthorized) {
			if (isEnrolled) {
				if (total != 0) {
					return (<Button id="drawBtn" onClick={onDraw} block>Draw</Button>);
				} else {
					return (<Button id="drawBtn" onClick={onDraw} block disabled>Draw</Button>);
				}
			} else {
				return (
					<LinkContainer to={{ pathname: '/enroll' }}>
						<Button id="drawBtn" block>Join</Button>
					</LinkContainer>
				);
			}
		}
	}

	renderMainContent(total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftId, extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription) {
		if (giftId) {
			return (
				<div>
					{this.renderGift(giftId, extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription)}
				</div>
			);
		} else {
			return (
				<div>
					<h1>Merry Christmas</h1>
					<div id="clockdiv">
						<div>
							<span className="days">{days}</span>
							<div className="smalltext">Days</div>
						</div>
						<div>
							<span className="hours">{hours}</span>
							<div className="smalltext">Hours</div>
						</div>
						<div>
							<span className="minutes">{minutes}</span>
							<div className="smalltext">Mins</div>
						</div>
						<div>
							<span className="seconds">{seconds}</span>
							<div className="smalltext">Secs</div>
						</div>
						
					</div>
					<div className="drawBtnFrame">
						{this.renderDrawBtn(total, isAuthorized, isEnrolled, onDraw)}
					</div>
				</div>
			);
		}
	}

	render() {
		const { total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription } = this.props;
		
		return (
			<div>				
				{this.renderMainContent(
					total, days, hours, minutes, seconds, 
					isAuthorized, isEnrolled, onDraw, giftId, 
					extension, building, providerName, providerPhoneNum,
					firstDescription, secondDescription, thirdDescription
				)}			
			</div>
		);
	}
	
}
