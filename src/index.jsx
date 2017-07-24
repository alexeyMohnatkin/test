import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'App/Modules/Layout/Header';
import Footer from 'App/Modules/Layout/Footer';
import styles from './styles.css';

import Page from 'App/Modules/Layout/Page';
import Home from 'App/Modules/Home/Components/Page';
import Users from 'App/Modules/Users/Components/ListPage';
import ViewUser from 'App/Modules/Users/Components/View';
import EditUser from 'App/Modules/Users/Components/Edit';
import AddUser from 'App/Modules/Users/Components/Add';
import Login from 'App/Modules/Auth/Components/Login';
import Logout from 'App/Modules/Auth/Components/Logout';
import Register from 'App/Modules/Auth/Components/Register';
import Page404 from 'App/Modules/Layout/404';

const App = () => (
	<div className={styles.root}>
		<Header />
			<Page>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/user" component={ViewUser}/>
					<Route exact path="/users" component={Users}/>
					<Route exact path="/users/add" component={AddUser}/>
					<Route exact path="/users/:id" component={EditUser}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/logout" component={Logout}/>
					<Route exact path="/register" component={Register}/>
					<Route status={404} component={Page404}/>
				</Switch>
			</Page>
		<Footer />
	</div>
);


export default App;
