import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';

import User from './models/user';
// import Recipe from './models/recipe';

import webpack from 'webpack';
import React from 'react';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable, { fromJS } from 'immutable';
import webpackConfig from '../../webpack.config';
import routes from '../common/routes';
import configureStore from '../common/store/configureStore';
import fetchComponentData from '../common/utils/fetchComponentData';
import apiRoutes from './controllers/api.js';

const app = new Express();
const port = process.env.PORT || 3000;
const host = process.env.VCAP_APP_HOST || 'localhost';



function initDBConnection(){

	var ca;
	var uri;

	if(process.env.VCAP_SERVICES) {
                var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
                // Pattern match to find the first instance of a Cloudant service in
                // VCAP_SERVICES. If you know your service key, you can access the
                // service credentials directly by using the vcapServices object.
                for(var vcapService in vcapServices){
                        if(vcapService.match(/mongodb/i)){
                                ca = [new Buffer(vcapServices[vcapService][0].credentials.ca_certificate_base64,'base64')];
				uri = vcapServices[vcapService][0].credentials.uri;

                                break;
                        }
                }
        } else{
		console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
		ca = [new Buffer(config.credentials.ca_certificate_base64, 'base64')];
		uri = config.credentials.uri;
	}


	// If the connection throws an error
	mongoose.connection.on('error',function (err) {
	  console.log('Mongoose default connection error: ');
	  console.log(err);
	});

	mongoose.connection.on('open', function (err) {
	    console.log("open~~~mongo db!!!!")
	    mongoose.connection.db.listCollections().toArray(function(err, collections) {
		collections.forEach(function(collection) {
		    console.log(collection);
		});
		//mongoose.connection.db.close();
		//process.exit(0);
	    })
	});

	var options = {
	    mongos: {
			ssl: true,
			sslValidate: true,
			sslCA:ca,
			poolSize: 1,
			reconnectTries: 1
	    },
	    db: {
	    	safe: false
	    }
	}

	mongoose.connect(uri,options); // will be replaced by bluemix info
}

initDBConnection();
// mongoose.connect(config.database);

app.set('env', 'production');
app.use('/static', Express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev')); // for log requests to the console

// handle each request, do rendering on the server side and send to the front-end
const handleRender = (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps == null) {
			res.status(404).send('Not found');
		}

		// fetch data from api server and construct initial state
		fetchComponentData(req.cookies.token).then((response) => {
			
			var drawedGift = {
				giftId: 0,
				extension: '',
				building: '',
				providerName: '',
				providerPhoneNum: '',
				firstDescription: '',
				secondDescription: '',
				thirdDescription: '',
			};

			var enrolledGift = {
				giftId: 0,
				extension: '',
				building: 'Beitou',
				providerName: '',
				providerPhoneNum: '',
				firstDescription: '',
				secondDescription: '',
				thirdDescription: '',
				isExchanged: false,
			};
			var adminConfig = {
				enrollSwitch: true,
				drawSwitch: true,
			};
			let isAuthorized = false;
			if (response[0].data.success === true) {
				isAuthorized = true;
				
				if (response[1].data.success === true) {
					drawedGift.giftId = response[1].data.gift.giftId;
					drawedGift.extension = response[1].data.gift.extension;
					if (!response[1].data.gift.building) {
						drawedGift.building = 'Beitou';
					} else {
						drawedGift.building = response[1].data.gift.building;
					}
					
					drawedGift.providerName = response[1].data.gift.providerName;
					drawedGift.providerPhoneNum = response[1].data.gift.providerPhoneNum;
					drawedGift.firstDescription = response[1].data.gift.firstDescription;
					drawedGift.secondDescription = response[1].data.gift.secondDescription;
					drawedGift.thirdDescription = response[1].data.gift.thirdDescription;
				}

				if (response[2].data.success === true) {
					enrolledGift.giftId = response[2].data.enrolledGift.giftId;
					enrolledGift.extension = response[2].data.enrolledGift.extension;
					enrolledGift.building = response[2].data.enrolledGift.building;
					enrolledGift.providerName = response[2].data.enrolledGift.providerName;
					enrolledGift.providerPhoneNum = response[2].data.enrolledGift.providerPhoneNum;
					enrolledGift.firstDescription = response[2].data.enrolledGift.firstDescription;
					enrolledGift.secondDescription = response[2].data.enrolledGift.secondDescription;
					enrolledGift.thirdDescription = response[2].data.enrolledGift.thirdDescription;
					enrolledGift.isExchanged = response[2].data.enrolledGift.isExchanged;
				}

				if (response[3].data.success === true) {

					adminConfig.enrollSwitch = response[3].data.enrollSwitch;
					adminConfig.drawSwitch = response[3].data.drawSwitch;
				} 

			} else {
				isAuthorized = false;
			}
			let isEnrolled = response[0].data.isEnrolled;
			let isAdmin = response[0].data.isAdmin;
			const deadline = '2016-12-25';		
			var t = getTimeRemaining(deadline);
			const initialState = fromJS({
				
				user: {
					isAuthorized: isAuthorized,
					isEnrolled: isEnrolled,
					isAdmin: isAdmin,
				},
				timer: {
					days: ('0' + t.days).slice(-2),
					hours: ('0' + t.hours).slice(-2),
					minutes: ('0' + t.minutes).slice(-2),
					seconds: ('0' + t.seconds).slice(-2),
				},
				//TODO: should add initial gift status for refresh
				draw: drawedGift,
				enroll: enrolledGift,	
				admin: adminConfig,

			});

			//server-side rendering
			const store = configureStore(initialState);
			const initView = renderToString(
				<Provider store={store}>
					<RouterContext {...renderProps} />
				</Provider>
			);

			let state = store.getState();
			let page = renderFullPage(initView, state);
			return res.status(200).send(page);
		})
		.catch(err => res.end(err.message));
	})
}

const getTimeRemaining = (endtime) => {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / (1000 * 60)) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t/ (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

// basic html template
const renderFullPage = (html, preloadedState) => (`
	<!doctype html>
	<html>
		<head>
			<title>Xmas 交換禮物</title>
			<!-- Latest compiled and minified CSS -->
        	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
        	<link rel="stylesheet" type="text/css" href="/static/index.css">
        </head>
        <body>
        	<div id="app">${html}</div>
        	<script>
        		window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        	</script>
        	<script src="/static/bundle.js"></script>
        </body>
     </html>
 `);

/*
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
*/

// set up api server routes
app.use('/api', apiRoutes);
app.use(handleRender);
app.listen(port,host, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info(`==> 🌎Listening on port ${port}. Open up http://${host}:${port}/ in your browser.`);
	}
});
