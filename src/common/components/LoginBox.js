import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, Col } from 'react-bootstrap';

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
				<Col sm={10}>
					<FormControl
						type="text"
						onChange={onChangeEmailInput}
						placeholder="Enter Email"
					/>
				</Col>
				<Col sm={2}>
					<FormControl.Static className="formLabel">.tw.ibm.com</FormControl.Static>
				</Col>
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