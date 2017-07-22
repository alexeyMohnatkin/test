// @flow

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type TProps = {
	icon: string,
	className?: string,
	iconClass?: string,
};

const SVGIcon = ({ icon, className, iconClass, ...props }: TProps) => {
	try {
		const Icon = require(`App/Images/Icons/${icon}.svg`).default;
		const rootClassName: string  = classNames(styles.root, className);

		return (
			<span className={rootClassName} {...props}>
				<svg viewBox={Icon.viewBox} className={iconClass}>
					<use xlinkHref={`#${Icon.id}`}></use>
				</svg>
			</span>
		);
	} catch (err) {
		console.warn(err);
		return null;
	}
};

export default SVGIcon;
