// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'App/UI/Spinner';
import RequireAdmin from 'App/Modules/Auth/Components/RequireAdmin';
import { loadItem, addItem } from '../../actions';
import Form from '../Form';
import styles from './styles.css';

import type { TReduxState } from 'App/Types/redux';

type TNewUser = {
	name: string,
	email: string,
	password: string,
};

type TProps = {
	loadItem: (id: string) => void,
	addItem: (user: TNewUser) => void,
};

type TState = {
	fetching: boolean,
	error: string,
	success: boolean,
};

@RequireAdmin
class AddUser extends PureComponent<*, TProps, TState> {
	props: TProps;
	state: TState;
	addUser: (user: TNewUser) => void;
	openUserPage: (id: string) => void;

	context: {
		router: any,
	};

	static contextTypes = {
		router: PropTypes.object
	};

	state = {
		fetching: false,
		error: '',
		success: false,
	};


	addUser = async ({ name, email, password }: TNewUser) => {
		const { fetching } = this.state;

		if (fetching) {
			return;
		}
		this.setState({ success: false, error: '', fetching: true });

		try {
			const res = await this.props.addItem({ name, email, password });

			this.setState({ success: true, fetching: false });
			return res.data.id;
		} catch (error) {
			this.setState({ success: false, error: `Error while adding user: ${error}`, fetching: false });
			throw error;
		}
	}

	openUserPage = (id: string) => {
		this.context.router.history.push(`/users/${id}`);
	}

	render() {
		const user = {
			name: '',
			email: '',
			password: '',
		};

		return (
			<div className={styles.root}>
				<h1>Add user</h1>
				{this.state.error && <div>{this.state.error}</div>}
				<Form
					onSubmit={this.addUser}
					action="/api/users"
					fetching={this.state.fetching}
					onComplete={this.openUserPage}
					user={user}
				/>
				{this.state.fetching && <Spinner />}
				{this.state.success && <div>User was added succesfully</div>}
				<Link to="/users">Back to users list</Link>
			</div>
		);
	}
}


function mapStateToProps(state: TReduxState) {
	return {
		user: state.users.item,
	};
}

export default connect(mapStateToProps, { loadItem, addItem })(AddUser);
