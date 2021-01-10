import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ItemEntry from './components/ItemEntry';
import SignIn from './components/SignIn';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import DisplayAllItems from './components/DisplayAllItems';
import UserItems from './components/UserItems';
import Navigation from './components/Navbar';
import AllUsers from './components/AllUsers';

function App() {
	return (
		<div className='App'>
			<header className='main-app-header'>
				<h1>African Marketplace</h1>
				<div className='img-container'></div>
			</header>
			<Navigation />
			<div className='main-app-container'>
				<Switch>
					<Route exact path='/' component={SignIn} />
					<Route path='/registration' component={Registration} />
					<PrivateRoute path='/home' component={DisplayAllItems} />
					<PrivateRoute path='/user' component={UserItems} />
					<PrivateRoute path='/sell' component={ItemEntry} />
					<PrivateRoute path='/users' component={AllUsers} />
				</Switch>
				</div>
				<footer>
					<p>Our Mission: Empowering Small Businesses.</p>
					<p>&copy; 2021 Track Team 198 </p>
				</footer>
		</div>
	);
}

export default App;