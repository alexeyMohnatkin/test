// @flow

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.css';

import { register } from '../../actions';

type TProps = {
	register: (name: string, email: string, password: string) => void,
};
type TState = {
	name: string,
	email: string,
	password: string,
	error: string,
	success: boolean,
};

class Register extends PureComponent {

	props: TProps;
	state: TState;
	onChangeEmail: (email: string) => void;
	onChangePassword: (password: string) => void;
	submit: () => void;

	state = {
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
	};

	onChangeName = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ name: event.currentTarget.value });
	}
	onChangeEmail = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ email: event.currentTarget.value });
	}
	onChangePassword = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ password: event.currentTarget.value });
	}

	submit = async (event: Event) => {
		event.preventDefault();
		const { name, email, password } = this.state;

		try {
			await this.props.register(name, email, password);
			this.setState({ success: true });
		} catch (error) {
			this.setState({ error });
		}
	}

	render() {
		const { name, email, password, error, success } = this.state;

		if (success) {
			return (
				<div>
					<h4>Congratuations!</h4>
					<p>Now try to <Link to="/login">login</Link></p>
				</div>
			);
		}
		return (
			<div>
				{error && <div>{error}</div>}
				<form onSubmit={this.submit}>
					<label className={styles.row}>
						<span className={styles.fieldTitle}>Name: </span>
						<input
							name="name"
							type="text"
							onChange={this.onChangeName} value={name}
						/>
					</label>
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
					<button type="submit">Sign up</button>
				</form>
			</div>
		);
	}
}

export default connect(null, { register })(Register);
