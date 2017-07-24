// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequireAuth from 'App/Modules/Auth/Components/RequireAuth';
import { logout } from '../../actions';

import type { TReduxState } from 'App/Types/redux';

type TProps = {
	isAdmin: boolean,
	logout: () => void,
};

export default function(WrappedComponent: ReactClass<any>) {
	@RequireAuth
	class RequireAdmin extends PureComponent {
		context: {
			router: any,
		};
		static contextTypes = {
			router: PropTypes.object
		};

		render() {
			if (!this.props.isAdmin) {
				return null;
			}
			return <WrappedComponent {...this.props} />;
		}
	}

	function mapStateToProps(state: TReduxState) {
		return {
			isAdmin: !!state.auth.credentials && state.auth.credentials.role === 'admin',
		};
	}

	return connect(mapStateToProps, { logout })(RequireAdmin);
}
