import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserItems, deleteItem } from '../actions/itemActions';
import ItemEdit from './ItemEdit';
import './itemcard.css';

function UserItems(props) {
	const [editing, setEditing] = useState(false);
	const [itemToEdit, setItemToEdit] = useState({});

	useEffect(() => {
		props.getUserItems(props.id);
	}, []);

	const handleEditing = (item) => {
		setEditing(true);
		setItemToEdit(item);
	};

	const handleDelete = (itemId, userId) => {
		props.deleteItem(itemId, userId);
	};

	if (props.loading) {
		return <span className='loading'>Loading...</span>;
	}

	return (
		<div className='item-card-container'>
			{' '}
			{/* Added classname to this div -sam */}
			{props.items.map((item) => {
				return (
					<div key={item.id} className='item-card'>
						<h3>Item: {item.product}</h3>
						<br />
						<p>Description: {item.description}</p>
						<br />
						{/* not using so removed --sam  <p>Category: {item.category}</p> */}
						<br />
						<span>Price: ${item.price}</span>
						<br />
						<button onClick={() => handleEditing(item)}>Edit Item</button>
						<button onClick={() => handleDelete(item.id, props.id)}>
							Delete Item
						</button>
					</div>
				);
			})}
			{editing && <ItemEdit item={itemToEdit} setEditing={setEditing} />}
		</div>
	);
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		items: state.item.userItems,
		id: state.user.id,
		loading: state.item.loading,
	};
};

export default connect(mapStateToProps, { getUserItems, deleteItem })(
	UserItems
);
