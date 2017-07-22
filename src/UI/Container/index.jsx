import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

const Container = ({ className, ...props }) => {
	return (
		<div className={classNames(styles.root, className)} {...props}></div>
	);
};

export default Container;
