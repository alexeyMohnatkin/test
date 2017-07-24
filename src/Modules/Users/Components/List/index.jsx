// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Spinner from 'App/UI/Spinner';
import PagedList from 'App/UI/PagedList';
import { deleteItem } from '../../actions';

import ListItem from '../ListItem';
import styles from './styles.css';

import type { TReduxState } from 'App/Types/redux';
import type { TUser } from '../../reducer';

type TProps = {
	usersList: {
		users: Array<TUser>,
		page: number,
		count: number,
		pages: number,
	},
	loadList: (page: ?number) => void,
	deleteItem: (id: string) => void,
};

class UsersList extends PureComponent {
	props: TProps;
	state: {
		loading: boolean,
		error: string,
		page: number,
	};
	loadList: (page: ?number) => void;

	state = {
		loading: false,
		error: '',
		deleteSuccess: false,
		page: 1,
	};

	componentDidMount() {
		this.loadList();
	}

	loadList = async (page: number=1) => {
		this.setState({ loading: true });
		try {
			await this.props.loadList(page);
			this.setState({ loading: false, page });
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
		const { usersList } = this.props;
		const { error, deleteSuccess } = this.state;

		if (!usersList.users) {
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

					<PagedList
						list={usersList.users}
						renderItem={(user: TUser) => <ListItem key={user._id} user={user} deleteUser={this.deleteUser} />}
						count={usersList.count}
						pageCount={usersList.pages}
						loadPage={this.loadList}
						currentPage={this.state.page}
					/>
				</table>
			</div>
		);
	}
}

function mapStateToProps(state: TReduxState) {
	return {
		usersList: state.users.list,
	};
}

export default connect(mapStateToProps, { deleteItem })(UsersList);
