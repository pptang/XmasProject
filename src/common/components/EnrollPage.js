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

	renderModifyBtn(isExchanged) {
		console.log("isExchanged:" + isExchanged);
		if (!isExchanged) {
			return (
				<Button className="indexFrame" onClick={this.props.onOpenModal}>修改資訊</Button>
			);
		}
	}

	renderEnrolledGift(modalVisible, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription, isExchanged) {
		const title = (
			<h1>我的禮物</h1>
		);
		return (
			<Row className="show-grid">
				<h5 style={{color: 'white','fontSize':'150%'}}>您已報名成功，務必列印禮物編號條並貼牢於您的禮物上</h5>
				<Col xs={6} xsOffset={3}>
					<Panel header={title} bsStyle="danger">
						<h1 style={{color: 'black','fontSize':'500%','fontWeight':'bold','margin':'5px 0px 5px'}}>{giftId}</h1>
						<ListGroup fill style={{"textAlign": "left"}}>
							<ListGroupItem>{providerName} / {providerPhoneNum}</ListGroupItem>
							<ListGroupItem>禮物形容詞1: {firstDescription}</ListGroupItem>
							<ListGroupItem>禮物形容詞2: {secondDescription}</ListGroupItem>
							<ListGroupItem>禮物形容詞3: {thirdDescription}</ListGroupItem>
							<ListGroupItem>
								<p style={{"textAlign":"left"}}>溫馨小提醒:</p>
								<ol style={{'padding-left':'1.8em'}}>
									<li>請同仁將禮物編號單列印並牢貼於您的禮物上</li>
									<li>繳交禮物的時間:
										<ul style={{'padding-left':'0.5em'}}>
											<li>NKO: 請繳交至Winnie Feng #6338</li>
											<li>CFC: Dec. 12-21 每週一、三、五 2:00-3:30 @ 3F Agile area</li>
											<li>Remote site: 最晚請於12/19前 internal mail 至CFC 3F Cathy Chen #3698 or Florence Lo #3579 收</li>
										</ul>
									</li>
									<li>活動時間: Dec. 23 14:30-16:00 @ CFC 4F Agile corner, remote site 同仁可於15:00 前往CFC參加活動</li>
								</ol>
							</ListGroupItem>
						</ListGroup>
						{ this.renderModifyBtn(isExchanged) }					
						<Button className="indexFrame" onClick={this.printResult}>列印</Button>
					</Panel>
					<Modal show={modalVisible} onHide={this.props.onCloseModal}>
						<Modal.Header closeButton style={{"backgroundColor": "#C6BBAC"}}>
							<Modal.Title style={{"color": "#fff"}}>修改資訊</Modal.Title>					
						</Modal.Header>
						<Modal.Body style={{"backgroundColor": "#9C3F3C"}}>
							<EnrollBoxContainer />
						</Modal.Body>
						
					</Modal>
				</Col>
			</Row>
		);
	}

	printResult() {
		window.print();
	}

	render() {
		const { spinnerVisible, modalVisible, isEnrolled, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription, isExchanged} = this.props;
		if (!isEnrolled) {
			return (
				<Grid>
					{this.renderEnrollBox(spinnerVisible, isEnrolled)}
				</Grid>
			);
			
		} else {
			return (
				<Grid>
					{this.renderEnrolledGift(modalVisible, giftId, extension, building, providerName, providerPhoneNum, firstDescription, secondDescription, thirdDescription, isExchanged)}
				</Grid>
			);
		}
		
	}
}
