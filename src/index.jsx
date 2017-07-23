import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'App/Modules/Layout/Header';
import Footer from 'App/Modules/Layout/Footer';
import styles from './styles.css';

import Home from 'App/Modules/Home/Components/Page';
import Users from 'App/Modules/Users/Components/ListPage';
import EditUser from 'App/Modules/Users/Components/Edit';
import AddUser from 'App/Modules/Users/Components/Add';
import Page404 from 'App/Modules/Layout/404';

const App = () => (
	<div className={styles.root}>
		<Header />
			<div className={styles.page}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/users" component={Users}/>
					<Route exact path="/users/add" component={AddUser}/>
					<Route exact path="/users/:id" component={EditUser}/>
					<Route status={404} component={Page404}/>
				</Switch>
			</div>
		<Footer />
	</div>
);


export default App;
