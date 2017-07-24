// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions';

import type { TReduxState } from 'App/Types/redux';

type TProps = {
	loggedIn: boolean,
	logout: () => void,
};

export default function(WrappedComponent: ReactClass<any>) {
	class RequireAuth extends PureComponent {
		context: {
			router: any,
		};
		static contextTypes = {
			router: PropTypes.object
		};

		componentDidMount() {
			if (!this.props.loggedIn) {
				this.proceedToLogin();
			}
		}

		componentWillUpdate(nextProps: TProps) {
			if (!nextProps.loggedIn) {
				this.proceedToLogin();
			}
		}

		proceedToLogin = () => {
			this.context.router.history.push('/login');
		}

		render() {
			if (!this.props.loggedIn) {
				return null;
			}
			return <WrappedComponent {...this.props} />;
		}
	}

	function mapStateToProps(state: TReduxState) {
		return { loggedIn: state.auth.loggedIn };
	}

	return connect(mapStateToProps, { logout })(RequireAuth);
}
