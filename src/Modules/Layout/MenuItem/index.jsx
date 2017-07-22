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
	if (icon) return (
		<Link to={link} className={styles.root}>
			<div className={styles.icon} title={title}>{icon}</div>
		</Link>
	);
	return (
		<Link to={link} className={styles.root}>
			<div className={styles.title}>{title}</div>
		</Link>
	);
};

export default Menu;
