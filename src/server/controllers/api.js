import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Gift from '../models/gift';
import ConfigModel from '../models/config';
import config from '../config';
import mongoose from 'mongoose';

const app = new Express();
const apiRoutes = Express.Router();

app.set('superSecret', config.secret);

apiRoutes.get('/cleanUpAdminConfig', (req, res) => {
	ConfigModel.remove({}, function(err) {
		if (err) throw err;
		res.json({
			success: true,
			message: 'Successfully clean all records',
		});
	});
});

apiRoutes.get('/setupAdminConfig', function(req, res) {
	ConfigModel.findOne({}, (err, config) => {
		if (err) throw err;
		if (!config) {
			var adminConfig = new ConfigModel({
				enrollSwitch: true,
				drawSwitch: true,
			});
			adminConfig.save((err, config) => {
				if (err) throw err;
				res.json({
					success: true,
					message: 'Successfully setup admin config',
					enrollSwitch: config.enrollSwitch,
					drawSwitch: config.drawSwitch,
				});
			});
		} else {
			res.json({
				success: true,
				message: 'Already setup!'
			});
		}
	})
	
});

apiRoutes.post('/login', function(req, res) {
	User.findOne({
		email: req.body.email
	}, (err, user) => {
		if (err) throw err;
		if (!user) {
			// let isAdmin = false;
			// if (req.body.email == 'admin@tw.ibm.com' && req.body.serialNumber == 'adminpwd') {
			// 	isAdmin = true;
			// }
			// insert user
			const newUser = new User({
				email: req.body.email,
				serialNumber: req.body.serialNumber,
				isEnrolled: false,
				isAdmin: false,
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
					isAdmin: user.isAdmin,
				});
			});
			
		} else if (user) {
			if (user.serialNumber != req.body.serialNumber) {
				res.json({ success: false, message: 'Authentication failed. Wrong serial Number.'});
			} else {
				const token = getJwtToken(user);
				
				res.json({
					success: true,
					message: 'Got the token!',
					token: token,
					userId: user._id,
					isEnrolled: user.isEnrolled,
					isDrawed: user.isDrawed,
					isAdmin: user.isAdmin,
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
		if (user) {
			console.log("isAdmin:" + user.isAdmin);
			res.json({
				success: true,
				message: 'Enjoy your token!',
				isEnrolled: user.isEnrolled,
				isAdmin: user.isAdmin,
			});
		} else {
			res.json({
				success: false,
				message: 'User not found!',
			});
		}
		
	});

});

apiRoutes.post('/enroll', (req, res) => {
	
	Gift.findOne({
		providerId: req.decoded.userId
	}, (err, gift) => {
		if (err) throw err;
		if (gift) {
			Gift.findOneAndUpdate({
				providerId: req.decoded.userId
			}, {
				$set: {
					extension: req.body.extension,
					building: req.body.building,
					providerName: req.body.providerName,
					providerPhoneNum: req.body.providerPhoneNum,
					firstDescription: req.body.firstDescription,
					secondDescription: req.body.secondDescription,
					thirdDescription: req.body.thirdDescription,
					providerId: req.decoded.userId,
					enrolledAt: new Date(),
				}
			}, {
				new: true
			}, (err, enrolledGift) => {
				if (err) throw err;
				
				res.json({
					success: true,
					message: 'Successfully updated enrolled info!',
					isEnrolled: true,
					enrolledGift: enrolledGift,
				})

			});
		} else {
			const newGift = new Gift({
				extension: req.body.extension,
				building: req.body.building,
				providerName: req.body.providerName,
				providerPhoneNum: req.body.providerPhoneNum,
				firstDescription: req.body.firstDescription,
				secondDescription: req.body.secondDescription,
				thirdDescription: req.body.thirdDescription,
				providerId: req.decoded.userId,
				enrolledAt: new Date(),
				isExchanged: false
			});

			newGift.save((err, enrolledGift) => {
				if (err) throw err;
				// update user enroll status
				User.update({ _id: req.decoded.userId }, {
					$set: { isEnrolled: true }
				}, (err) => {
					if (err) throw err;
					
					res.json({
						success: true,
						message: 'Successfully enrolled!',
						isEnrolled: true,
						enrolledGift: enrolledGift,
					});
		
				});
		
			});

		}
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
			return;
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
			}, {
				new: true
			}, (err, gift) => {
				
				//TODO: 沒有禮物的話不能回true
				if (err) throw err;
				if (gift) {
					res.json({
						success: true,
						message: 'Successfully drawed!',
						gift: gift,
					});
				} else {
					res.json({
						success: false,
						message: 'No more gift!',
					});
				}
				
			});
			
		});
		

	});
});

apiRoutes.get('/getMyGift', (req, res) => {
	Gift.findOne({
		newOwnerId: req.decoded.userId
	}, (err, gift) => {
		if (err) throw err;
		if (!gift) {
			res.json({
				success: false,
				message: 'No gift found',
			});
			return;
		}
		
		res.json({
			success: true,
			message: 'Successfully got your gift!',
			gift: gift,
		});
	});
});

apiRoutes.get('/getEnrolledGift', (req, res) => {
	
	Gift.findOne({
		providerId: req.decoded.userId
	}, (err, enrolledGift) => {
		if (err) throw err;
		if (!enrolledGift) {
			res.json({
				success: false,
				message: 'No enrolled gift found',
			});
			return;
		}
		
		res.json({
			success: true,
			message: 'Successfully got your gift!',
			enrolledGift: enrolledGift,
		});
	});
});

apiRoutes.get('/getAdminConfigStatus', (req, res) => {
	ConfigModel.findOne({}, (err, config) => {
		if (err) throw err;
		if (config) {
			
			res.json({
				success: true,
				enrollSwitch: config.enrollSwitch,
				drawSwitch: config.drawSwitch,
			});
		} else {
			const newConfig = new ConfigModel({
				enrollSwitch: true,
				drawSwitch: true,
			});
			newConfig.save((err, config) => {
				if (err) throw err;
				res.json({
					success: true,
					enrollSwitch: config.enrollSwitch,
					drawSwitch: config.drawSwitch,
				});
			});
			
		}
		
		
	});
});

apiRoutes.post('/setAdminConfig', (req, res) => {
	
	ConfigModel.findOneAndUpdate({}, {
		$set: {
			enrollSwitch: req.body.enrollSwitch,
			drawSwitch: req.body.drawSwitch,
		}			
	}, {
		new: true
	}, (err, config) => {
		if (err) throw err;
		if (config) {
			console.log("update success")
			res.json({
				success: true,
				enrollSwitch: config.enrollSwitch,
				drawSwitch: config.drawSwitch,
			});
		} else {
			console.log("no config");
			res.json({
				success: false,
				message: 'no config found',
			});
		}
		
	});
});

export default apiRoutes;