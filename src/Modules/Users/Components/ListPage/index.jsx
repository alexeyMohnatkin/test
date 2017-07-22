import React, { Component } from 'react';
import Container from 'App/UI/Container';

import UsersList from '../List';

class UsersPage extends Component {
	render() {
		return (
			<div>
				<Container>
					Users
					<UsersList />
				</Container>
			</div>
		);
	}
}

export default UsersPage;
