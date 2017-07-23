// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import SVGIcon from 'App/UI/SVGIcon';
import styles from './styles.css';

type TProps = {
	size: 'small' | 'normal' | 'large',
	className?: string,
};


class Spinner extends PureComponent {
	static defaultProps = {
		size: 'normal',
	};
	props: TProps;
	render() {
		const { size, className } = this.props;
		const spinnerClass = classNames(
			styles.root,
			styles[size],
			className,
		);

		return (
			<SVGIcon icon="spinner" className={spinnerClass} />
		);
	}
}

export default Spinner;
