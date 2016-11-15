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

export default apiRoutes;