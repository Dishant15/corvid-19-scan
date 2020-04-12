import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"

import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

import PageNotFound from './others/PageNotFound'

import Urls from './UrlConfig'

import './App.scss'

export default class App extends Component {

	state = {
		mount_app : false
	}

	render = () => {
		return (
			<BrowserRouter>
				<Switch>

					<Route exact path={Urls.getHomePage()} component={HomePage} />

					<Route path={Urls.getAuthPages()} component={AuthPage} />
					{/* <Route path={Urls.getForgotPassPage()} component={ForgetPassword} />
					<Route path={Urls.getResetPassPage()} component={ResetPasswordPage} /> */}

					<Route exact path={Urls.get404()} component={PageNotFound} />
					<Route exact path="*" component={PageNotFound} />

				</Switch>
			</BrowserRouter>
		)
	}
}