import React from 'react';
import { useParams, Link } from 'react-router-dom';

function UserCard({ users }) {
	let params = useParams();
	let userID = params.id; //returns as string
	const selectedUser = users.filter((user) => user.id === parseInt(userID)); //returns array with single object
	const userObj = selectedUser[0]; //grabbing that object

	return (
			<div className='user-card'>
					<h3>User: {userObj.username}</h3>
					<p>Name: {userObj.name}</p>
					<p>📧 {userObj.email}</p>
					<p>🌎 {userObj.location}</p>
					{/* <Link to='/users'>🔙 Back to All Sellers</Link> */}
			</div>		
	);
}

export default UserCard;

