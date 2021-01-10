import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import UserCard from './UserCard';
import './AllUsers.css';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';

function AllUsers(props) {
	const [userState, setUserState] = useState([]);
	const users = props.users;
	// useEffect(() => {
	// 	axios
	// 		.get('https://reqres.in/api/users?page=2api/users')
	// 		.then((res) => {
	// 			console.log('axios success!', res.data.data);
	// 			setUserState(res.data.data);
	// 		})
	// 		.catch((err) => console.log('axios error', err));
	// }, []);

	useEffect(() => {
		props.getAllUsers();
		// setUserState(users);
		// console.log(users, 'users');
	}, []);

	if (props.loading) {
		return <span className='loading'>Loading...</span>;
	}

	return (
		<section>
			{/* <Route exact path='/users'> */}
			<h2>All Sellers</h2>
			<p>
				Below are all our registered small business owners. Please click on
				their name for more information.
			</p>
			<div className='users-container'>
				<section className='user-list'>
					{users.map((user) => {
						return (
							<p key={user.id}>
								<Link to={`/users/${user.id}`}>
									{user.username} ({user.name})
								</Link>
							</p>
						);
					})}
				</section>
				<section className='user-card-box'>
					{/* </Route> */}
					<Route path='/users/:id'>
						<UserCard users={users} />
					</Route>
				</section>
			</div>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		users: state.user.allUsers,
		loading: state.item.loading,
	};
};

export default connect(mapStateToProps, { getAllUsers })(AllUsers);
