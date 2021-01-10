import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

function SignIn(props) {
	const history = useHistory();

	const [formState, setFormState] = useState({
		username: '',
    password: '',
    department: ''
	});

	const [buttonDisabled, setButtonDisabled] = useState(true);

	const [errors, setErrors] = useState({
		username: '',
    password: '', 
    department: ''
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

	const formSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted!');
		props.logIn(formState);
	};

	useEffect(() => {
		if (props.username) {
			history.push('/home');
		}
	}, []);

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
		username: yup.string().required('Must include a username'),
    password: yup.string().required('Password is required'),
    department: yup.string().required('Must include department: Buyer or Seller')
	});

	useEffect(() => {
		formSchema.isValid(formState).then((isValid) => {
			setButtonDisabled(!isValid);
		});
	}, [formState, formSchema]);

	if (props.loading) {
		return <span className='loading'>Loading...</span>;
	}

	return (
		<form onSubmit={formSubmit}>
			<h2>Welcome back!</h2>
			<p>Please login to continue.</p>
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
				placeholder='Password'
				onChange={inputChange}
				data-cy='password'
			/>

<input
				type='department'
				id='department'
				name='department'
				value={formState.department}
				placeholder='Department'
				onChange={inputChange}
				data-cy='department'
			/>

			<button disabled={buttonDisabled} type='submit'>
				Submit
			</button>
			<Link to='/registration'>Don't have an account? Please register</Link>
		</form>
	);
}

const mapStateToProps = (state) => {
	return {
		serverError: state.user.error,
		loading: state.user.loading,
		username: state.user.username,
	};
};

export default connect(mapStateToProps, { logIn })(SignIn);