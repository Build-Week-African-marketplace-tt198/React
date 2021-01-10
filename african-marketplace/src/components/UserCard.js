import React from 'react';
import { useParams, Link } from 'react-router-dom';

function UserCard({ users }) {
	let params = useParams();
	let userID = params.id; 
	const selectedUser = users.filter((user) => user.id === parseInt(userID)); 
	const userObj = selectedUser[0];

	return (
			<div className='user-card'>
					<h3>User: {userObj.username}</h3>
					<p>Name: {userObj.name}</p>
					<p>📧 {userObj.email}</p>
					<p>🌎 {userObj.location}</p>
					
			</div>		
	);
}

export default UserCard;

