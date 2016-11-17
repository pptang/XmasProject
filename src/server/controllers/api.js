import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Gift from '../models/gift';
import config from '../config';

const app = new Express();
const apiRoutes = Express.Router();

app.set('superSecret', config.secret);

apiRoutes.post('/login', function(req, res) {
	User.findOne({
		email: req.body.email
	}, (err, user) => {
		if (err) throw err;
		if (!user) {
			// insert user
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				serialNumber: req.body.serialNumber,
				phoneNumber: req.body.phoneNumber,
				isEnrolled: false,
				admin: false
			});
			newUser.save((err, user) => {
				if (err) throw err;
				const token = jwt.sign({ email: req.body.email }, app.get('superSecret'), {
					expiresIn: 60 * 60 * 24 //expires in 24 hours
				});
				
				res.json({
					success: true,
					message: 'Got the token!',
					token: token,
					userId: user._id,
					isEnrolled: false
				});
			});
			
		} else if (user) {
			if (user.serialNumber != req.body.serialNumber) {
				res.json({ success: false, message: 'Authentication failed. Wrong serial Number.'});
			} else if (user.phoneNumber != req.body.phoneNumber) {
				res.json({ success: false, message: 'Authentication failed. Wrong phone Number.'});
			} else {
				const token = jwt.sign({ email: user.email }, app.get('superSecret'), {
					expiresIn: 60 * 60 * 24 //expires in 24 hours
				});
				
				res.json({
					success: true,
					message: 'Got the token!',
					token: token,
					userId: user._id,
					isEnrolled: user.isEnrolled
				});
			}
		}
	});
});

apiRoutes.use((req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token']; // go check this

	if (token) {
		jwt.verify(token, app.get('superSecret'), (err, decoded) => {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

apiRoutes.get('/authenticate', (req, res) => {
	res.json({
		success: true,
		message: 'Enjoy your token!',
	});
});

apiRoutes.post('/enroll', (req, res) => {
	const newGift = new Gift({
		name: req.body.name,
		description: req.body.description,
		providerId: req.body.userId,
		enrolledAt: new Date(),
		isExchanged: false
	});

	newGift.save((err) => {
		if (err) throw err;
		// update user enroll status
		User.update({ _id: req.body.userId }, {
			$set: { isEnrolled: true }
		}, (err) => {
			if (err) throw err;
			console.log('Upload user enrolled status successfully!');

		});
		res.json({
			success: true,
			message: 'Successfully enrolled!',
			isEnrolled: true
		});
	})
})

export default apiRoutes;