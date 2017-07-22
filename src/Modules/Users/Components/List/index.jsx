import React, { Component } from 'react';
import { connect } from 'react-redux';

class UsersList extends Component {
	render() {
		console.log(this.props.users);
		return (
			<div>
				list of users: {this.props.users}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.users.list,
	};
}

export default connect(mapStateToProps)(UsersList);
