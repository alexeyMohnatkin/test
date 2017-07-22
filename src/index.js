import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'App/Modules/Layout/Header';
import Footer from 'App/Modules/Layout/Footer';
import styles from './styles.css';

import Home from 'App/Modules/Home/Components/Page';
import Users from 'App/Modules/Users/Components/ListPage';

const App = () => (
	<div className={styles.root}>
		<Header />
		<div className={styles.page}>
			<Route exact path="/" component={Home}/>
			<Route exact path="/users" component={Users}/>
			</div>
		<Footer />
	</div>
);

export default App;
