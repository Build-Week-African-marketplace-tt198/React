import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import ItemEntry from './components/ItemEntry';
import SignIn from './components/Login';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import AllItems from './components/AllItems';
import UserItems from './components/UserItems';
import Navigation from'./components/Navigation';

function App() {
	return (
		<div className='App'>
			{/* <h1 style={{ margin: '0 auto' }}>African Marketplace</h1> */}
			<Navigation/>
			<Switch>
				<Route exact path='/' component={SignIn} />
				<Route path='/registration' component={Registration} />
				<Route path='/home' component={AllItems} />
				<Route path='/user' component={UserItems} />
				<Route path='/sell' component={ItemEntry} />
			</Switch>
		</div>
	);
}

export default App;

