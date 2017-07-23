// @flow

import React, { PureComponent } from 'react';
import styles from './styles.css';

import type { TUser } from '../../reducer';

type TProps = {
	user: TUser,
	onSubmit: (user: TUser) => void,
	action: string,
	fetching: boolean,
	onComplete: (id: string) => void,
};

type TState = {
	name: string,
	email: string,
	password: string,
};

class Form extends PureComponent<*, TProps, TState> {
	props: TProps;
	state: TState;
	onChangeName: (name: string) => void;
	onChangeEmail: (email: string) => void;
	onChangePassword: (password: string) => void;
	submit: () => void;

	state = {
		name: '',
		email: '',
		password: '',
	};

	componentDidMount() {
		const { name, email, password } = this.props.user;

		this.setState({ name, email, password });
	}


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
		const { user, fetching } = this.props;
		const { name, email, password } = this.state;

		if (fetching) {
			return;
		}

		try {
			if (!user._id) {
				console.log('new user');
				const id: string = await this.props.onSubmit({ ...this.props.user, name, email, password });

				this.props.onComplete(id);
				return;
			}
			await this.props.onSubmit({ ...this.props.user, name, email, password });

		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { action, fetching, user } = this.props;
		const { name, email, password } = this.state;

		if (!user) {
			return null;
		}

		return (
			<form className={styles.root} onSubmit={this.submit} method="post" action={action}>
				<label className={styles.row}>
					<span className={styles.fieldTitle}>Name: </span>
					<input type="text" onChange={this.onChangeName} value={name} />
				</label>
				<label className={styles.row}>
					<span className={styles.fieldTitle}>Email: </span>
					<input type="email" onChange={this.onChangeEmail} value={email} />
				</label>
				<label className={styles.row}>
					<span className={styles.fieldTitle}>Password: </span>
					<input type="password" onChange={this.onChangePassword} value={password} />
				</label>
				<button type="submit" disabled={fetching}>Save</button>
			</form>
		);
	}
}

export default Form;
