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
						placeholder="請輸入分機號碼"
						defaultValue={extension}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>Location</h5></ControlLabel>
					<FormControl
						componentClass="select"
						onChange={onChangeBuildingInput}
						defaultValue={building}
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
						placeholder="請輸入你的名字"
						defaultValue={providerName}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>電話號碼</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeProviderPhoneNumInput}
						placeholder="請輸入你的電話號碼"
						defaultValue={providerPhoneNum}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>第一個禮物描述</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeFirstDescriptionInput}
						placeholder="描述 1"
						defaultValue={firstDescription}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>第二個禮物描述</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeSecondDescriptionInput}
						placeholder="描述 2"
						defaultValue={secondDescription}
					/>
				</FormGroup>
				<FormGroup controlId="formBasicText" className="formGroup">
					<ControlLabel><h5>第三個禮物描述</h5></ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeThirdDescriptionInput}
						placeholder="描述 3"
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
