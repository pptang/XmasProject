import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, Image, DropdownButton, MenuItem } from 'react-bootstrap';

const EnrollBox = ({
	extension,
	building,
	providerName,
	providerPhoneNum,
	firstDescription,
	secondDescription,
	thirdDescription,
	isEnrolled,
	onChangeExtensionInput,
	onChangeBuildingInput,
	onChangeProviderNameInput,
	onChangeProviderPhoneNumInput,
	onChangeFirstDescriptionInput,
	onChangeSecondDescriptionInput,
	onChangeThirdDescriptionInput,
	onEnrollSubmit,
	goBackToIndex
}) => (
	// isEnrolled === false ?
	// (
		<div className="formFrame">
			<form>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>分機號碼</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeExtensionInput}
						placeholder="Extension"
						defaultValue={extension}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>大樓</h5></ControlLabel>
					<FormControl
						componentClass="select"
						onChange={onChangeBuildingInput}
						defaultValue={"Beitou"}
					>
						<option value="Beitou">Beitou</option>
						<option value="CFC 3F">CFC 3F</option>
						<option value="CFC 4F">CFC 4F</option>
						<option value="NKO">NKO</option>
						<option value="e-center">e-center</option>
						<option value="HSC">HSC</option>
						<option value="TCH">TCH</option>
						<option value="TNN">TNN</option>
						<option value="KAO">KAO</option>
					</FormControl>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>姓名</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeProviderNameInput}
						placeholder="Name"
						defaultValue={providerName}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>手機 (可能接到神秘貴賓的來電，請務必保持手機順暢)</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeProviderPhoneNumInput}
						placeholder="Mobile phone number"
						defaultValue={providerPhoneNum}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>請輸入一個詞來形容您的禮物</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeFirstDescriptionInput}
						placeholder="Enter first description"
						defaultValue={firstDescription}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>請輸入第二個詞來形容您的禮物</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeSecondDescriptionInput}
						placeholder="Enter second description"
						defaultValue={secondDescription}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>請輸入第三個詞來形容您的禮物</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeThirdDescriptionInput}
						placeholder="Enter third description"
						defaultValue={thirdDescription}
					/>
				</FormGroup>
				<Button
					onClick={onEnrollSubmit}
					className="submitButton"
					bsSize="large"
					block
				>
					Submit
				</Button>
			</form>
		</div>
	// ) :
	// (
	// 	<div>
	// 		<Image src="/static/images/enroll_success.gif" id="enrollSuccessImg" />
	// 		<div>傳送成功！等聖誕節當天就可以上來抽囉！</div>
	// 		<div className="drawBtnFrame">
	// 			<Button id="drawBtn" onClick={goBackToIndex} block>回首頁</Button>
	// 		</div>
	// 	</div>
	// )
);

export default EnrollBox;
