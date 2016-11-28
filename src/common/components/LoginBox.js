import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

const LoginBox = ({
	email,
	serialNumber,
	onChangeEmailInput,
	onChangeSerialNumberInput,
	onLoginSubmit
}) => (
	<div className="formFrame">
		<Form horizontal>
			<FormGroup controlId="formBasicText">
				<ControlLabel className="formLabel">請輸入您的Email</ControlLabel>
				<FormControl
					type="text"
					onChange={onChangeEmailInput}
					placeholder="Enter Email"
				/>
				<FormControl.Feedback />
			</FormGroup>
			<FormGroup controlId="formBasicText">
				<ControlLabel className="formLabel">請輸入您的Serial Number</ControlLabel>
				<FormControl
					type="text"
					onChange={onChangeSerialNumberInput}
					placeholder="Enter Serial Number"
				/>
				<FormControl.Feedback />
			</FormGroup>
			<Button
				className="submitButton"
				onClick={onLoginSubmit}
				bsSize="large"
				block
			>
				Submit
			</Button>
		</Form>
	</div>
);

export default LoginBox;