import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserItems, deleteItem } from '../actions/itemActions';
import EditItem from './EditItem';

function UserItems(props) {
	const [editing, setEditing] = useState(false);
	const [itemToEdit, setItemToEdit] = useState({});
	useEffect(() => {
		props.getUserItems(props.id);
	}, [props.id]);

	const handleEditing = (item) => {
		setEditing(true);
		setItemToEdit(item);
	};

	const handleDelete = (id) => {
		props.deleteItem(id);
	};

	return (
		<div>
			{props.items.map((item) => {
				console.log(item);
				return (
					<div key={item.id}>
						<span>{item.product}</span>
						<br />
						<span>{item.description}</span>
						<br />
						<span>${item.price}</span>
						<br />
						<button onClick={() => handleEditing(item)}>Edit Item</button>
						<button onClick={() => handleDelete(item.id)}>Delete Item</button>
					</div>
				);
			})}
			{editing && <EditItem item={itemToEdit} setEditing={setEditing} />}
		</div>
	);
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		items: state.item.userItems,
		id: state.user.id,
	};
};

export default connect(mapStateToProps, { getUserItems, deleteItem })(
	UserItems
);
