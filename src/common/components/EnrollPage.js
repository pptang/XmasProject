import React from 'react';
import { Grid, Row, Col, Image, Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import EnrollBoxContainer from '../containers/EnrollBoxContainer';

export default class EnrollPage extends React.Component {

	renderSpinner(spinnerVisible) {
		if (spinnerVisible) {
			return (
				<Image src="/static/images/hourglass.svg" />
			);
		} 

		return null;
	}

	renderEnrollBox(spinnerVisible, isEnrolled) {
		return (
			<Row className="show-grid">
				<Col xs={6} xsOffset={3}>
					<EnrollBoxContainer />
					{this.renderSpinner(spinnerVisible)}					
				</Col>
			</Row>
		);
	}

	renderEnrolledGift(giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription) {
		const title = (
			<h1>你的禮物</h1>
		);
		return (
			<Panel header={title} bsStyle="primary">
				<h1 style={{color: 'black'}}>{giftId}</h1>
				<ListGroup fill>
					<ListGroupItem>{providerName} / {providerPhoneNum}</ListGroupItem>
					<ListGroupItem>禮物形容詞1: {firstDescription}</ListGroupItem>
					<ListGroupItem>禮物形容詞2: {secondDescription}</ListGroupItem>
					<ListGroupItem>禮物形容詞3: {thirdDescription}</ListGroupItem>
					<ListGroupItem></ListGroupItem>
				</ListGroup>
				<Button onClick={this.printResult}>列印</Button>
			</Panel>
		);
	}

	printResult() {
		window.print();
	}

	render() {
		const { spinnerVisible, isEnrolled, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription} = this.props;
		if (!isEnrolled) {
			return (
				<Grid>{this.renderEnrollBox(spinnerVisible, isEnrolled)}</Grid>
			);
			
		} else {
			return (
				<div>{this.renderEnrolledGift(giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription)}</div>
			);
		}
		
	}
}
