// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Spinner from 'App/UI/Spinner';
import { loadList, deleteItem } from '../../actions';
import ListItem from '../ListItem';
import styles from './styles.css';

import type { TReduxState } from 'App/Types/redux';
import type { TUser } from '../../reducer';

type TProps = {
	users: Array<TUser>,
	loadList: () => void,
	deleteItem: (id: string) => void,
};

class UsersList extends PureComponent {
	props: TProps;
	state: {
		loading: boolean,
		error: string,
	};

	state = {
		loading: false,
		error: '',
		deleteSuccess: false,
	};

	componentDidMount() {
		this.loadList();
	}

	loadList = async () => {
		this.setState({ loading: true });
		try {
			await this.props.loadList();
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			throw error;
		}
	}

	deleteUser = async (id: string) => {
		this.setState({ error: '', deleteSuccess: false });
		try {
			await this.props.deleteItem(id);
			this.setState({ deleteSuccess: true });
			this.loadList();
		} catch (error) {
			this.setState({ error: `Failed to delete user: ${error}` });
			throw error;
		}
	}

	render() {
		const { users } = this.props;
		const { error, deleteSuccess } = this.state;

		if (!users) {
			return null;
		}
		if (this.state.loading) {
			return <Spinner />;
		}
		return (
			<div className={styles.root}>
				{error && <div>{error}</div>}
				{deleteSuccess && <div>User was removed successfully</div>}
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user: TUser) => <ListItem key={user._id} user={user} deleteUser={this.deleteUser} />)}
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps(state: TReduxState) {
	return {
		users: state.users.list,
	};
}

export default connect(mapStateToProps, { loadList, deleteItem })(UsersList);
