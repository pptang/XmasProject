import React from 'react';
import { Button, Image } from 'react-bootstrap';
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
	
	renderGift(extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription) {
		return (
			<div>
				<h1>Congratulations! You got <b>To be modified</b> as your X'mas gift!</h1>
				<Image src="/static/images/santa.gif" />
				<h2>It seems to be ...</h2>
				
				<div className="circle">{firstDescription}</div>
				<div className="circle">{secondDescription}</div>
				<div className="circle">{thirdDescription}</div>
				
			</div>
		);
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

	renderMainContent(total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription) {
		if (giftname) {
			return (
				<div>
					{this.renderGift(extension, building, providerName, providerphoneNum, firstDescription, secondDescription, thirdDescription)}
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
							<div className="smalltext">Minutes</div>
						</div>
						<div>
							<span className="seconds">{seconds}</span>
							<div className="smalltext">Seconds</div>
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
		const { total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftname, firstDescription, secondDescription, thirdDescription } = this.props;
		
		return (
			<div>				
				{this.renderMainContent(
					total, days, hours, minutes, seconds, 
					isAuthorized, isEnrolled, onDraw, giftname, 
					firstDescription, secondDescription, thirdDescription
				)}			
			</div>
		);
	}
	
}
