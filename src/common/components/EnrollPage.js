import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import EnrollBoxContainer from '../containers/EnrollBoxContainer';

const EnrollPage = ({
	spinnerVisible,
}) => (
	<div>
		<Row className="show-grid">
			<Col xs={6} xsOffset={3}>
				<EnrollBoxContainer />
				{
					spinnerVisible === true ?
					<Image src="/static/images/loading.gif" /> : null
				}
			</Col>
		</Row>
	</div>
);

export default EnrollPage;