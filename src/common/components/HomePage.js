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
	
	renderGift(giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription, exchangedAt) {
		const title = (
			<h1>抽到的禮物</h1>
		);
		return (
			<Row className="show-grid">
				<Col xs={6} xsOffset={3}>
					<Panel header={title} bsStyle="danger">
						<h1 style={{color: 'black'}}>你抽到的禮物</h1>
						<h2 style={{color: 'black'}}>{giftId}</h2>
						<ListGroup fill style={{"textAlign": "left"}}>
							<ListGroupItem>{providerName} / {providerPhoneNum}</ListGroupItem>
							<ListGroupItem>禮物形容詞1: {firstDescription}</ListGroupItem>
							<ListGroupItem>禮物形容詞2: {secondDescription}</ListGroupItem>
							<ListGroupItem>禮物形容詞3: {thirdDescription}</ListGroupItem>
							<ListGroupItem>所在地: {building}</ListGroupItem>
							<ListGroupItem>分機: {extension}</ListGroupItem>
							<ListGroupItem>抽獎時間: {exchangedAt}</ListGroupItem>
						</ListGroup>
						<Button className="indexFrame" onClick={this.printResult}>列印</Button>
					</Panel>
				</Col>
			</Row>
		);
	}

	printResult() {
		window.print();
	}

	renderDrawBtn(total, isAuthorized, isEnrolled, onDraw) {
		if (isAuthorized) {
			if (isEnrolled) {
				if (total != 0) {
					return (<Button id="drawBtn" onClick={onDraw} block>點我抽獎</Button>);
				} else {
					return (<Button id="drawBtn" onClick={onDraw} block disabled>點我抽獎</Button>);
				}
			} else {
				return (
					<LinkContainer to={{ pathname: '/enroll' }}>
						<Button id="drawBtn" block>參加活動</Button>
					</LinkContainer>
				);
			}
		}
	}

	renderMainContent(total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftId, extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription, exchangedAt) {
		if (giftId) {
			return (
				<div>
					{this.renderGift(giftId, extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription, exchangedAt)}
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
					<div class="event_description">
						<h4 className="mainContentText">2016 IBM Christmas Event</h4>
						<hr style={{"width": "30%"}}/>
						<h2 className="mainContentText">Exchanging Gifts</h2>
						<hr style={{"width": "30%"}}/>
						<p className="mainContentText">2016.12.23 14:30-16:00</p>
						<p className="mainContentText">CFC 4F Agile Corner</p>
					</div>
					<div className="drawBtnFrame">
						{this.renderDrawBtn(total, isAuthorized, isEnrolled, onDraw)}
					</div>
				</div>
			);
		}
	}

	render() {
		const { total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription, exchangedAt } = this.props;
		
		return (
			<div>				
				{this.renderMainContent(
					total, days, hours, minutes, seconds, 
					isAuthorized, isEnrolled, onDraw, giftId, 
					extension, building, providerName, providerPhoneNum,
					firstDescription, secondDescription, thirdDescription, exchangedAt
				)}			
			</div>
		);
	}
	
}
