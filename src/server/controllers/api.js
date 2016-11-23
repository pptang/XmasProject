import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Gift from '../models/gift';
import config from '../config';
import mongoose from 'mongoose';
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
				admin: false,
				isDrawed: false,
			});
			newUser.save((err, user) => {
				if (err) throw err;
				const token = getJwtToken(user);
				
				res.json({
					success: true,
					message: 'Got the token!',
					token: token,
					userId: user._id,
					isEnrolled: false,
					isDrawed: false,
				});
			});
			
		} else if (user) {
			if (user.serialNumber != req.body.serialNumber) {
				res.json({ success: false, message: 'Authentication failed. Wrong serial Number.'});
			} else if (user.phoneNumber != req.body.phoneNumber) {
				res.json({ success: false, message: 'Authentication failed. Wrong phone Number.'});
			} else {
				const token = getJwtToken(user);
				
				res.json({
					success: true,
					message: 'Got the token!',
					token: token,
					userId: user._id,
					isEnrolled: user.isEnrolled,
					isDrawed: user.isDrawed,
				});
			}
		}
	});
});

function getJwtToken(user) {
	return jwt.sign({ email: user.email, userId: user._id }, 
						app.get('superSecret'), {
							expiresIn: 60 * 60 * 24 //expires in 24 hours
						}
					);
}


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
	
	User.findOne({
		email: req.decoded.email
	}, (err, user) => {
		if (err) throw err;
		res.json({
			success: true,
			message: 'Enjoy your token!',
			isEnrolled: user.isEnrolled,
		});
	});

});

apiRoutes.post('/enroll', (req, res) => {
	
	const newGift = new Gift({
		name: req.body.name,
		description: req.body.description,
		providerId: req.decoded.userId,
		enrolledAt: new Date(),
		isExchanged: false
	});

	newGift.save((err) => {
		if (err) throw err;
		// update user enroll status
		User.update({ _id: req.decoded.userId }, {
			$set: { isEnrolled: true }
		}, (err) => {
			if (err) throw err;
			console.log('Upload user enrolled status successfully!');
			res.json({
				success: true,
				message: 'Successfully enrolled!',
				isEnrolled: true
			});

		});
		
	});
});

apiRoutes.post('/draw', (req, res) => {
	
	Gift.aggregate([
		{
			$match: {
				isExchanged: false,
				providerId: {
					$ne: mongoose.Types.ObjectId(req.decoded.userId), // can't be the same user as provider
				},
				
			}
		},
		{
			$sample: {
				size: 1
			}
		}
	], (err, result) => {
		

		if (err) throw err;
		
		if(!result) {
			res.json({
				success: false,
				message: 'No more gift!',
			});
		}

		User.update({
			_id: req.decoded.userId,
		}, {
			$set: { isDrawed: true }
		}, (err) => {
			if (err) throw err;
			console.log("result after update:" + JSON.stringify(result));
			Gift.findOneAndUpdate({
				_id: result[0] ? result[0]._id : null
			}, {
				$set: {
					isExchanged: true,
					newOwnerId: req.decoded.userId,
					exchangedAt: new Date(),
				}
			}, (err, gift) => {
				console.log("gift after findoneandupdate:" + JSON.stringify(gift));
				if (err) throw err;
				res.json({
					success: true,
					message: 'Successfully drawed!',
					gift: gift,
				});
			});
			
		});
		

	});
});

export default apiRoutes;