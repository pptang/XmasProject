import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
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
			res.json( { success: false, message: 'Authentication failed. User not found.'});
		} else if (user) {
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.'});
			} else {
				const token = jwt.sign({ email: user.email }, app.get('superSecret'), {
					expiresIn: 60 * 60 * 24 //expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Got the token!',
					token: token,
					userId: user._id
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

export default apiRoutes;