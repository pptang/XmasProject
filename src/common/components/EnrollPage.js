import React from 'react';
import { Grid, Row, Col, Image, Panel, Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
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

	renderEnrolledGift(modalVisible, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription) {
		const title = (
			<h1>你的禮物</h1>
		);
		return (
			<Row className="show-grid">
				<Col xs={6} xsOffset={3}>
					<Panel header={title} bsStyle="primary">
						<h1 style={{color: 'black'}}>{giftId}</h1>
						<ListGroup fill style={{"textAlign": "left"}}>
							<ListGroupItem>{providerName} / {providerPhoneNum}</ListGroupItem>
							<ListGroupItem>禮物形容詞1: {firstDescription}</ListGroupItem>
							<ListGroupItem>禮物形容詞2: {secondDescription}</ListGroupItem>
							<ListGroupItem>禮物形容詞3: {thirdDescription}</ListGroupItem>
						</ListGroup>
						<Button onClick={this.props.onOpenModal}>修改資訊</Button>
						<Button onClick={this.printResult}>列印</Button>
					</Panel>
					<Modal show={modalVisible} onHide={this.props.onCloseModal}>
						<Modal.Header closeButton>
							<Modal.Title>修改資訊</Modal.Title>					
						</Modal.Header>
						<Modal.Body>
							<EnrollBoxContainer />
						</Modal.Body>
						<Modal.Footer>
						</Modal.Footer>
					</Modal>
				</Col>
			</Row>
		);
	}

	printResult() {
		window.print();
	}

	render() {
		const { spinnerVisible, modalVisible, isEnrolled, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription} = this.props;
		if (!isEnrolled) {
			return (
				<Grid>
					{this.renderEnrollBox(spinnerVisible, isEnrolled)}
				</Grid>
			);
			
		} else {
			return (
				<Grid>
					{this.renderEnrolledGift(modalVisible, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription)}
				</Grid>
			);
		}
		
	}
}
