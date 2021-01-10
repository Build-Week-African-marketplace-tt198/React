import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../actions/userActions';
// import '../index.css';

function Navigation(props) {
	const history = useHistory();

	const handleLogout = () => {
		history.push('/');
		props.logOut();
	};

	return (
		<div className='nav-header'>
			
			{props.username && (
				<ul id='nav'>
					<li>
						<span className='welcome-user'>Welcome, {props.username}!</span>
					</li>
					<li>
						<Link to='/user'>User's Items</Link>
					</li>
				
					<li>
						<Link to='/sell'>Add Item</Link>
					</li>
					<li>
						<Link to='/home'>All Items</Link>
					</li>
					<li>
						<Link to='/users'>See All Users</Link>
					</li>
					<li>
						<a onClick={handleLogout}>Log Out</a>
					</li>
				</ul>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
	};
};

export default connect(mapStateToProps, { logOut })(Navigation);

