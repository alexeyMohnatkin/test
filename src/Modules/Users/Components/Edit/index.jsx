// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'App/UI/Spinner';
import RequireAdmin from 'App/Modules/Auth/Components/RequireAdmin';
import { loadItem, updateItem } from '../../actions';
import Form from '../Form';
import styles from './styles.css';

import type { TReduxState } from 'App/Types/redux';
import type { TUser } from '../../reducer';

type TProps = {
	user: TUser,
	loadItem: (id: string) => void,
	updateItem: (id: string, user: TUser) => void,
};

type TState = {
	loading: boolean,
	updating: boolean,
	error: string,
	success: boolean,
};

@RequireAdmin
class EditUser extends PureComponent<*, TProps, TState> {
	props: TProps;
	state: TState;
	updateUser: (user: TUser) => void;
	loadUser: () => void;

	state = {
		loading: false,
		updating: false,
		error: '',
		success: false,
	};

	componentDidMount() {
		this.loadUser();
	}

	loadUser = async () => {
		this.setState({ loading: true });
		try {
			await this.props.loadItem(this.props.match.params.id);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false, error });
		}
	}

	updateUser = async ({ name, email, password }: TUser) => {
		const { updating } = this.state;

		if (updating) {
			return;
		}
		this.setState({ success: false, error: '', updating: true });

		try {
			await this.props.updateItem(this.props.user._id, { name, email, password });
			this.setState({ success: true, updating: false });
			this.loadUser();
		} catch (error) {
			this.setState({ success: false, error: `Error while updating user ${error}`, updating: false });
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
				<h1>User {user.name}</h1>
				{error && <div>{error}</div>}
				<Form
					onSubmit={this.updateUser}
					action={`/api/users/${user._id}`}
					fetching={this.state.updating}
					onComplete={this.loadUser}
					user={user}
				/>
				{this.state.success && <div>User was updated succesfully</div>}
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

export default connect(mapStateToProps, { loadItem, updateItem })(EditUser);
