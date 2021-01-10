import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import './ItemEntry.css';
import { connect } from 'react-redux';
import { addItem, getUserItems } from '../actions/itemActions';
import { useHistory } from 'react-router-dom';


const blankState = {
	name: '',
	price: '',
	description: '',
	category: '',

};

const ItemEntry = (props) => {
	const history = useHistory();

	const formik = useFormik({
		initialValues: { ...blankState },
		validationSchema: yup.object({
			name: yup
				.string()
				.required()
				.label('Name')
				.min(2, 'Must be at least 2 characters.'),
			price: yup
				.number()
				.required()
				.label('Price')
				.min(0.99, 'Price must be at least 0.99 USD'),
			description: yup
				.string()
				.required()
				.label('Description')
				.min(2, 'must be at least 2 characters'),
			category: yup.number().oneOf([34, 35, 36, 37, 38]).required(),
		}),
		
		onSubmit: (values) => {
			props.addItem(values, props.id);
			history.push('/user');
		
		},
	});

	if (props.loading) {
		return <span className='loading'>Loading...</span>;
	}

	return (
		<section>
			<h2>Add Product</h2>
			<p>Please enter the following information.</p>

			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='name'>Product Name: </label>
				<input
					id='name'
					name='name'
					type='text'
					placeholder='item name'
					onChange={formik.handleChange}
					value={formik.values.name}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.name && formik.errors.name ? (
					<span className='errorMsg'>{formik.errors.name}</span>
				) : null}

				<br />

				<label htmlFor='price'>Price: </label>
				<input
					id='price'
					name='price'
					type='number'
					step='0.05'
					placeholder='item price'
					onChange={formik.handleChange}
					value={formik.values.price}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.price && formik.errors.price ? (
					<span className='errorMsg'>{formik.errors.price}</span>
				) : null}

				<br />

				<label htmlFor='category'>Category: </label>
				<select
					id='category'
					name='category'
					onChange={formik.handleChange}
					value={formik.values.category}
					onBlur={formik.handleBlur}
				>
					<option value=''>-- choose a category --</option>
					<option value={34}>Baskets</option>
					<option value={35}>Coffee</option>
					<option value={36}>Beans</option>
					<option value={37}>Animal Product</option>
					<option value={38}>Other</option>
				</select>
				{formik.errors.category && formik.errors.category ? (
					<span className='errorMsg'>{formik.errors.category}</span>
				) : null}
				<br />

				<label htmlFor='description'>Description: </label>
				<textarea
					id='description'
					name='description'
					as='textarea'
					placeholder='describe this item in 1-2 sentences'
					onChange={formik.handleChange}
					value={formik.values.description}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.description && formik.errors.description ? (
					<span className='errorMsg'>{formik.errors.description}</span>
				) : null}
				<br />

				

				<button
					type='submit'
					disabled={
						formik.isValid && formik.values !== formik.initialValues
							? false
							: true
					}
				>
					Add Product
				</button>
			</form>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		id: state.user.id,
		loading: state.item.loading,
	};
};

export default connect(mapStateToProps, { addItem, getUserItems })(ItemEntry);

