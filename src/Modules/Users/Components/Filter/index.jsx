// @flow

import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import styles from './styles.css';

type TProps = {
	action: string,
	onChange: (filter: any) => void,
};

type TState = {
	name: string,
	email: string,
};

class Form extends PureComponent<*, TProps, TState> {
	props: TProps;
	state: TState;
	onChangeName: (name: string) => void;
	onChangeEmail: (email: string) => void;
	submit: () => void;

	state = {
		name: '',
		email: '',
	};

	constructor(props: TProps) {
		super(props);

		this.handleFilter = debounce(this.handleFilter, 500);
	}

	onChangeName = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ name: event.currentTarget.value }, this.handleFilter);
	}
	onChangeEmail = (event: Event & { currentTarget: HTMLInputElement }) => {
		this.setState({ email: event.currentTarget.value }, this.handleFilter);
	}

	submit = (event: Event) => {
		event.preventDefault();
		this.handleFilter();
	}
	handleFilter = () => {
		const { name, email } = this.state;

		this.props.onChange({ name, email });
	}

	render() {
		const { action } = this.props;
		const { name, email } = this.state;

		return (
			<form className={styles.root} onSubmit={this.submit} method="get" action={action}>
				<h3>Filter</h3>
				<label className={styles.row}>
					<span className={styles.fieldTitle}>Name: </span>
					<input type="text" onChange={this.onChangeName} value={name} />
				</label>
				<label className={styles.row}>
					<span className={styles.fieldTitle}>Email: </span>
					<input type="email" onChange={this.onChangeEmail} value={email} />
				</label>
			</form>
		);
	}
}

export default Form;
