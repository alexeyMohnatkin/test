import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';

type TProps = {
	logout: () => void,
};

class SignOut extends PureComponent {
	props: TProps;

	componentWillMount() {
		this.props.logout();
	}

	render() {
		return <div>Hire me</div>;
	}
}

export default connect(null, { logout })(SignOut);
