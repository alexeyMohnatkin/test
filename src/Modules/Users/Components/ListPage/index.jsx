import React, { PureComponent } from 'react';
import Container from 'App/UI/Container';
import { Link } from 'react-router-dom';

import UsersList from '../List';

class UsersPage extends PureComponent {
	render() {
		return (
			<div>
				<Container>
					<h1>Users</h1>
					<UsersList />
					<Link to="/users/add">Add user</Link>
				</Container>
			</div>
		);
	}
}

export default UsersPage;
