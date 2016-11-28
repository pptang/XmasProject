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
	isEnrolled === false ?
	(
		<div>
			<Form horizontal className="formFrame">
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入分機號碼</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeExtensionInput}
						placeholder="請輸入分機號碼"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入公司Building</ControlLabel>
					<FormControl
						componentClass="select"
						onChange={onChangeBuildingInput}
						placeholder="請選擇所在Building"
					>
						<option value="CFC3">CFC 3F</option>
						<option value="CFC4">CFC 4F</option>
						<option value="NKO9">NKO 9F</option>
						<option value="NKO10">NKO 10F</option>
					</FormControl>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入你的名字</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeProviderNameInput}
						placeholder="請輸入你的名字"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入你的電話號碼</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeProviderPhoneNumInput}
						placeholder="請輸入公司你的電話號碼"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入您的第一個禮物描述</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeFirstDescriptionInput}
						placeholder="Enter First Description"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入您的第二個禮物描述</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeSecondDescriptionInput}
						placeholder="Enter Second Description"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId="formBasicText">
					<ControlLabel className="formLabel">請輸入您的第三個禮物描述</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeThirdDescriptionInput}
						placeholder="Enter Thrid Description"
					/>
					<FormControl.Feedback />
				</FormGroup>
				<Button
					onClick={onEnrollSubmit}
					className="submitButton"
					bsSize="large"
					block
				>
					Submit
				</Button>
			</Form>
		</div>
	) :
	(
		<div>
			<Image src="/static/images/enroll_success.gif" id="enrollSuccessImg" />
			<div>傳送成功！等聖誕節當天就可以上來抽囉！</div>
			<div className="drawBtnFrame">
				<Button id="drawBtn" onClick={goBackToIndex} block>回首頁</Button>
			</div>
		</div>
	)
);

export default EnrollBox;