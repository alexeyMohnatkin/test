// @flow

import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '../MenuItem';
import styles from './styles.css';
import { PERMISSIONS } from '../constants';

import type { TReduxState } from 'App/Types/redux';
import type { TMenuItem } from '../MenuItem';

type TProps = {
	items: Array<TMenuItem>,
	loggedIn: boolean,
	isAdmin: boolean,
};

const Menu = ({ items, loggedIn, isAdmin }: TProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.menu}>
				{items.map((item: TMenuItem, key: number) => {
					if (item.permissions === PERMISSIONS.AUTHORIZED && !loggedIn) {
						return null;
					}
					if (item.permissions === PERMISSIONS.ADMIN && !isAdmin) {
						return null;
					}
					if (item.permissions === PERMISSIONS.UNAUTHORIZED && loggedIn) {
						return null;
					}
					return <MenuItem key={key} {...item} />;
				})}
			</div>
		</div>
	);
};

function mapStateToProps(state: TReduxState) {
	return {
		loggedIn: state.auth.loggedIn,
		isAdmin: !!state.auth.credentials && state.auth.credentials.role === 'admin',
	};
}

export default connect(mapStateToProps)(Menu);
