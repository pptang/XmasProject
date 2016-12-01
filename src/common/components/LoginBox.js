import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, InputGroup, Col } from 'react-bootstrap';

const LoginBox = ({
	email,
	serialNumber,
	onChangeEmailInput,
	onChangeSerialNumberInput,
	onLoginSubmit
}) => (
	<div className="formFrame">
		<form>
			<FormGroup controlId="formControlsEmail">
				<ControlLabel><h3 className="formLabel">Email</h3></ControlLabel>
				<InputGroup>				
					<FormControl type="email" onChange={onChangeEmailInput}
						placeholder="Enter Email"/>
					<InputGroup.Addon>@tw.ibm.com</InputGroup.Addon>
				</InputGroup>
			</FormGroup>
			<FormGroup controlId="formControlsSN">
				<ControlLabel><h3 className="formLabel">S/N</h3></ControlLabel>
				<FormControl type="text" onChange={onChangeSerialNumberInput}
					placeholder="Enter Serial Number"/>
			</FormGroup>
			
			<Button
				className="submitButton"
				onClick={onLoginSubmit}
				bsSize="large"
				block
			>
				登入
			</Button>
		</form>
	</div>
);

export default LoginBox;