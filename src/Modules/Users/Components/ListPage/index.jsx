import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RequireAdmin from 'App/Modules/Auth/Components/RequireAdmin';
import Filter from '../Filter';
import { loadList } from '../../actions';

import UsersList from '../List';

@RequireAdmin
class UsersPage extends PureComponent {
	loadList: (page: ?number) => void;
	state = {
		filter: {
			name: '',
			email: '',
		}
	}

	setFilter = (filter: any) => {
		this.setState({ filter }, this.loadList);
	}

	loadList = async (page: number=1) => {
		try {
			return await this.props.loadList({ page, filter: this.state.filter });
		} catch (error) {
			throw error;
		}
	}

	render() {
		return (
			<div>
				<h1>Users</h1>
				<Filter onChange={this.setFilter} action="/api/users" />
				<UsersList loadList={this.loadList} />
				<Link to="/users/add">Add user</Link>
			</div>
		);
	}
}

export default connect(null, { loadList })(UsersPage);
