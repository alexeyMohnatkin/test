import React, { PureComponent } from 'react';
import Container from 'App/UI/Container';
import styles from './styles.css';

class Footer extends PureComponent {
	render() {
		return (
			<div className={styles.root}>
				<Container className={styles.container}>
					footer
				</Container>
			</div>
		);
	}
}

export default Footer;
