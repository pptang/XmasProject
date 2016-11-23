import React from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, Image } from 'react-bootstrap';

const EnrollBox = ({
	giftname,
	firstDescription,
	secondDescription,
	thirdDescription,
	isEnrolled,
	onChangeGiftNameInput,
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
					<ControlLabel className="formLabel">請輸入禮物名稱</ControlLabel>
					<FormControl
						type="text"
						onChange={onChangeGiftNameInput}
						placeholder="Enter Gift Name"
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