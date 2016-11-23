import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

const LoginBox = ({
	username,
	email,
	serialNumber,
	phoneNumber,
	onChangeUsernameInput,
	onChangeEmailInput,
	onChangeSerialNumberInput,
	onChangePhoneNumberInput,
	onLoginSubmit
}) => (
	<div className="formFrame">
		<Form horizontal>
			<FormGroup controlId="formBasicText">
				<ControlLabel className="formLabel">請輸入您的名字</ControlLabel>
				<FormControl
					type="text"
					onChange={onChangeUsernameInput}
					placeholder="Enter Name"
				/>
				<FormControl.Feedback />
			</FormGroup>
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
			<FormGroup controlId="formBasicText">
				<ControlLabel className="formLabel">請輸入您的Phone Number</ControlLabel>
				<FormControl
					type="text"
					onChange={onChangePhoneNumberInput}
					placeholder="Enter Phone Number"
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