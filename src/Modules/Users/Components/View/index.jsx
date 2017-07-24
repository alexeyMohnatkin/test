// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Spinner from 'App/UI/Spinner';
import RequireAuth from 'App/Modules/Auth/Components/RequireAuth';
import { loadItem } from '../../actions';
import styles from './styles.css';

import type { TReduxState } from 'App/Types/redux';
import type { TUser } from '../../reducer';

type TProps = {
	user: TUser,
	credentials: TUser,
	loadItem: (id: string) => void,
};

type TState = {
	loading: boolean,
	error: string,
	success: boolean,
};

@RequireAuth
class EditUser extends PureComponent<*, TProps, TState> {
	props: TProps;
	state: TState;
	updateUser: (user: TUser) => void;
	loadUser: () => void;

	state = {
		loading: false,
		error: '',
		success: false,
	};

	componentDidMount() {
		this.loadUser();
	}

	loadUser = async () => {
		this.setState({ loading: true });
		const { _id } = this.props.credentials;

		try {
			await this.props.loadItem(_id);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false, error });
		}
	}

	render() {
		const { user } = this.props;
		const { error } = this.state;

		if (!user) {
			return null;
		}

		if (this.state.loading) {
			return <Spinner />;
		}
		return (
			<div className={styles.root}>
				<h1>My account</h1>
				{error && <div>{error}</div>}

				<div>Name: {user.name}</div>
				<div>Email: {user.email}</div>
			</div>
		);
	}
}


function mapStateToProps(state: TReduxState) {
	return {
		user: state.users.item,
		credentials: state.auth.credentials,
	};
}

export default connect(mapStateToProps, { loadItem })(EditUser);
