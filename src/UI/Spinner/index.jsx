// @flow

import React from 'react';
import classNames from 'classnames';
import SVGIcon from 'App/UI/SVGIcon';
import styles from './styles.css';

type TDefaultProps = {
	size: string,
}
type TProps = {
	size: 'small' | 'normal' | 'large',
	className?: string,
}

const Spinner = (props: TProps): React$Element<*> => {
	const {
		size,
		className,
		...otherProps
	} = props;


	const spinnerClass = classNames(
		styles.spinner,
		styles[size],
		className,
	);

	return (
		<SVGIcon icon="spinner" />
	);
};

Spinner.defaultProps = {
	size: 'normal',
};

export default Spinner;
