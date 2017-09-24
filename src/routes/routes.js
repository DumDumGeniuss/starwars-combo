import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import HomePage from '../components/pages/HomePage/HomePage.js';
import MainLayout from '../components/layouts/MainLayout/MainLayout.js';

class Routers extends React.Component {
	render() {
		return (
			<Router>
				<MainLayout>
					<Switch>
						<Route exact path='/' component={HomePage} />
					</Switch>
				</MainLayout>
			</Router>
		);
	}
}

export default Routers;