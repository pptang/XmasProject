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
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
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
mongoose.connect(config.database); // will be replaced by bluemix info
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
			let isAuthorized = false;
			if (response[0].data.success === true) {
				isAuthorized = true;
			} else {
				isAuthorized = false;
			}
			let isEnrolled = response[0].data.isEnrolled;
			const deadline = '2016-12-25';		
			var t = getTimeRemaining(deadline);
			const initialState = fromJS({
				// recipe: {
				// 	recipes: response[0].data,
				// 	recipe: {
				// 		id: '',
				// 		name: '',
				// 		description: '',
				// 		imagePath: '',
				// 	}
				// },
				user: {
					isAuthorized: isAuthorized,
					isEnrolled: isEnrolled,
				},
				timer: {
					days: ('0' + t.days).slice(-2),
					hours: ('0' + t.hours).slice(-2),
					minutes: ('0' + t.minutes).slice(-2),
					seconds: ('0' + t.seconds).slice(-2),
				},
				draw: {
					drawedGift: '',
				}
				
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

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// set up api server routes
app.use('/api', apiRoutes);
app.use(handleRender);
app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
	}
});
