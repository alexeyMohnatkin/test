// @flow

import React from 'react';
import MenuItem from '../MenuItem';
import styles from './styles.css';

import type { TMenuItem } from '../MenuItem';

type TProps = {
	items: Array<TMenuItem>,
};

const Menu = ({ items }: TProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.menu}>
				{items.map((item: TMenuItem, key: number) => <MenuItem key={key} {...item} />)}
			</div>
		</div>
	);
};

export default Menu;
