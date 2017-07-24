import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { tryAuth } from 'App/Modules/Auth/actions';
import Container from 'App/UI/Container';
import styles from './styles.css';

class Page extends PureComponent {
	componentDidMount() {
		this.props.tryAuth();
	}

	render() {
		return (
			<div className={styles.root}>
				<Container>{this.props.children}</Container>
			</div>
		);
	}
}

export default connect(null, { tryAuth })(Page);
