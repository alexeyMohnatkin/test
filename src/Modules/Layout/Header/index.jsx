// @flow

import React, { PureComponent } from 'react';
import Container from 'App/UI/Container';
import Menu from '../Menu';
import styles from './styles.css';
import SVGIcon from 'App/UI/SVGIcon';

import { PERMISSIONS } from '../constants';

const menuItems = [{
	title: 'Home',
	icon: <SVGIcon icon="home" />,
	link: '/',
	permissions: PERMISSIONS.ALL,
}, {
	title: 'Account',
	link: '/user',
	permissions: PERMISSIONS.AUTHORIZED,
}, {
	title: 'Manage users',
	link: '/users',
	permissions: PERMISSIONS.ADMIN,
},
];
const authMenuItems = [{
	title: 'Login',
	link: '/login',
	permissions: PERMISSIONS.ALL,
}, {
	title: 'Logout',
	link: '/logout',
	permissions: PERMISSIONS.AUTHORIZED,
},
];

class Header extends PureComponent {
	render() {
		return (
			<header className={styles.root}>
				<Container className={styles.container}>
					<Menu items={menuItems} />
					<Menu items={authMenuItems} />
				</Container>
			</header>
		);
	}
}

export default Header;
