import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

const EnrollBox = ({
	giftname,
	description,
	isEnrolled,
	onChangeGiftNameInput,
	onChangeDescriptionInput,	
	onEnrollSubmit,
	goBackToIndex
}) => (
	isEnrolled === false ?
	(
		<div>
			<Form horizontal>
				<FormGroup controlId="formBasicText">
					<ControlLabel>請輸入禮物名稱</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeGiftNameInput}
						placeholder="Enter Gift Name"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel>請輸入您的禮物描述</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeDescriptionInput}
						placeholder="Enter Description"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<Button
					onClick={onEnrollSubmit}
					bsStyle="success"
					bsSize="large"
					block
				>
					提交送出
				</Button>
			</Form>
		</div>
	) :
	(
		<div>
			<div>傳送成功！等聖誕節當天就可以上來抽囉！</div>
			<Button onClick={goBackToIndex}>回首頁</Button>
		</div>
	)
);

export default EnrollBox;