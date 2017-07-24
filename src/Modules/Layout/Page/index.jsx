import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { tryAuth } from 'App/Modules/Auth/actions';
import Container from 'App/UI/Container';
import styles from './styles.css';

class Page extends PureComponent {
	state: {
		ready: boolean,
	};
	state = {
		ready: false,
	};
	componentDidMount() {
		this.props.tryAuth();
		this.setState({ ready: true });
	}

	render() {
		if (!this.state.ready) {
			return null;
		}
		return (
			<div className={styles.root}>
				<Container>{this.props.children}</Container>
			</div>
		);
	}
}

export default connect(null, { tryAuth })(Page);
