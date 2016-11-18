import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

const EnrollBox = ({
	giftname,
	description,
	onChangeGiftNameInput,
	onChangeDescriptionInput,	
	onEnrollSubmit
}) => (
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
);

export default EnrollBox;