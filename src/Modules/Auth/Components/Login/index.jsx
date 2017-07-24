// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles.css';

import { login } from '../../actions';

import type { TReduxState } from 'App/Types/redux';

type TProps = {
	login: (email: string, password: string) => void,
};
type TState = {
	email: string,
	password: string,
	error: string,
};

class Login extends PureComponent {

	props: TProps;
	state: TState;
	onChangeEmail: (email: string) => void;
	onChangePassword: (password: string) => void;
	submit: () => void;

	context: {
		router: any,
	};

	static contextTypes = {
		router: PropTypes.object
	};

	state = {
		email: '123@123.dsa',
		// email: 'user@user.ru',
		password: '123',
		error: '',
	};

	onChangeEmail = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ email: event.currentTarget.value });
	}
	onChangePassword = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ password: event.currentTarget.value });
	}

	submit = async (event: Event) => {
		event.preventDefault();
		const { email, password } = this.state;

		try {
			await this.props.login(email, password);
			this.context.router.history.push('/');
		} catch (error) {
			this.setState({ error });
		}
	}

	render() {
		const { email, password, error } = this.state;

		return (
			<div>
				{error && <div>{error}</div>}
				<form onSubmit={this.submit}>
					<label className={styles.row}>
						<span className={styles.fieldTitle}>Email: </span>
						<input
							name="email"
							type="email"
							onChange={this.onChangeEmail} value={email}
						/>
					</label>
					<label className={styles.row}>
						<span className={styles.fieldTitle}>Password: </span>
						<input
							name="password"
							type="password"
							onChange={this.onChangePassword}
							value={password}
						/>
					</label>
					<button type="submit">Sign in</button>
				</form>
			</div>
		);
	}
}


function mapStateToProps(state: TReduxState) {
	return {

	};
}

export default connect(mapStateToProps, { login })(Login);
