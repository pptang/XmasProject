import React from 'react';
import { Button } from 'react-bootstrap';

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
	
	renderGift(giftname, firstDescription, secondDescription, thirdDescription) {
		return (
			<div>
				<div>{giftname}</div>
				<div>{firstDescription}</div>
				<div>{secondDescription}</div>
				<div>{thirdDescription}</div>
			</div>
		);
	}

	renderDrawBtn(total, isAuthorized, isEnrolled, onDraw) {
		if (isAuthorized && isEnrolled) {
			if (total != 0) {
				return (<Button onClick={onDraw} bsStyle="success" bsSize="large" block>Draw</Button>);
			} else {
				return (<Button onClick={onDraw} bsStyle="success" bsSize="large" block disabled>Draw</Button>);
			}
		}
	}

	renderMainContent(total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftname, firstDescription, secondDescription, thirdDescription) {
		if (giftname) {
			return (
				<div>
					{this.renderGift(giftname, firstDescription, secondDescription, thirdDescription)}
				</div>
			);
		} else {
			return (
				<div>
					<div id="clockdiv">
						<div>
							<span className="days">{days}</span>
							<div className="smalltext">天</div>
						</div>
						<div>
							<span className="hours">{hours}</span>
							<div className="smalltext">時</div>
						</div>
						<div>
							<span className="minutes">{minutes}</span>
							<div className="smalltext">分</div>
						</div>
						<div>
							<span className="seconds">{seconds}</span>
							<div className="smalltext">秒</div>
						</div>
						
					</div>
					{this.renderDrawBtn(total, isAuthorized, isEnrolled, onDraw)}
				</div>
			);
		}
	}

	render() {
		const { total, days, hours, minutes, seconds, isAuthorized, isEnrolled, onDraw, giftname, firstDescription, secondDescription, thirdDescription } = this.props;
		
		return (
			<div>
				<h1>聖誕交換禮物大作戰</h1>
				{this.renderMainContent(
					total, days, hours, minutes, seconds, 
					isAuthorized, isEnrolled, onDraw, giftname, 
					firstDescription, secondDescription, thirdDescription
				)}
				
				
			</div>
		);
	}
	
}
