import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { register } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

function Form(props) {
	const history = useHistory();

	const [formState, setFormState] = useState({
		username: '',
		password: '',
		location: '',	
	});

	const [buttonDisabled, setButtonDisabled] = useState(true);

	const [errors, setErrors] = useState({
		username: '',
		password: '',
		location: '',	
	});

	const validateChange = (e) => {
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
			.then((valid) => {
				setErrors({
					...errors,
					[e.target.name]: '',
				});
			})
			.catch((err) => {
				console.log(err);

				setErrors({
					...errors,
					[e.target.name]: err.errors[0],
				});
			});
	};

	const formSubmit = async (e) => {
		e.preventDefault();
		console.log('form submitted!');
		await props.register({
			username: formState.username,
			password: formState.password,
			location: formState.location,
		});
		history.push('/home');
	};

	const inputChange = (e) => {
		e.persist();
		console.log('input changed!', e.target.value);
		const newFormData = {
			...formState,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value,
		};

		validateChange(e);
		setFormState(newFormData);
	};

	const formSchema = yup.object().shape({
		
		username: yup.string().required('Please choose a username'),

		password: yup.string().min(0).max(128),
		
		location: yup.string().required('Please Include Location'),

	});

	useEffect(() => {
		formSchema.isValid(formState).then((isValid) => {
			setButtonDisabled(!isValid);
		});
	}, [formState, formSchema]);

	if (props.loading) {
		console.log('loading');
		return <span className='loading'>Loading...</span>;
	}

	return (
		<form onSubmit={formSubmit}>
		
			<p>Welcome! Please fill out the following information to continue.</p>
			{props.serverError ? <p className='error'>{props.serverError}</p> : null}

			<input
				id='username'
				type='text'
				name='username'
				value={formState.username}
				placeholder='Username'
				onChange={inputChange}
				data-cy='username'
			/>
			{errors.username.length > 0 ? (
				<p className='error'>{errors.username}</p>
			) : null}

			<input
				type='password'
				id='password'
				name='password'
				value={formState.password}
				placeholder='password'
				onChange={inputChange}
				data-cy='password'
			/>
			{errors.password.length > 0 ? (
				<p className='error'>{errors.password}</p>
			) : null}

			<input
				type='text'
				id='location'
				name='location'
				value={formState.location}
				placeholder='Location'
				onChange={inputChange}
				data-cy='location'
			/>
			{errors.location.length > 0 ? (
				<p className='error'>{errors.location}</p>
			) : null}

			<button disabled={buttonDisabled} type='submit'>
				Submit
			</button>
		</form>
	);
}

const mapStateToProps = (state) => {
	return {
		serverError: state.user.error,
		loading: state.user.loading,
	};
};

export default connect(mapStateToProps, { register })(Form);
