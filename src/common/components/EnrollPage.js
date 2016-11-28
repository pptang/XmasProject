import React from 'react';
import { Grid, Row, Col, Image, Panel } from 'react-bootstrap';
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

	renderEnrolledGift(extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription) {
		const title = (
			<h1>你的禮物</h1>
		);
		return (
			<Panel header={title}>
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
			</Panel>
		);
	}

	render() {
		const { spinnerVisible, isEnrolled, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription} = this.props;
		if (!isEnrolled) {
			return (
				<Grid>{this.renderEnrollBox(spinnerVisible, isEnrolled)}</Grid>
			);
			
		} else {
			return (
				<div>{this.renderEnrolledGift(extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription)}</div>
			);
		}
		
	}
}
