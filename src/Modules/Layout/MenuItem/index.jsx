// @flow

import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router-dom';

export type TMenuItem = {
	title: string,
	icon?: React$Element<*>,
	link: string,
	permissions: number,
};

const Menu = ({ title, icon, link, permissions }: TMenuItem) => {
	return (
		<Link to={link} className={styles.root}>
			{!!icon && <div className={styles.icon} title={title}>{icon}</div>}
			{!icon && <div className={styles.title}>{title}</div>}
		</Link>
	);
};

export default Menu;
