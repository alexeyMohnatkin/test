import authMiddleware from './middleware/auth';
import adminOnly from './middleware/adminOnly';

import getUsersList from './users/getList';
import getUser from './users/getUser';
import updateUser from './users/updateUser';
import addUser from './users/addUser';
import deleteUser from './users/deleteUser';
import auth from './auth/auth';
import register from './auth/register';


export default (app) => {
	app.use('/api/users', authMiddleware);
	app.use('/api/users', adminOnly);

	app.route('/api/users')
		.get(getUsersList)
		.post(addUser);

	app.route('/api/users/:id')
		.get(getUser)
		.put(updateUser)
		.delete(deleteUser);

	app.route('/api/auth')
		.post(auth);
	app.route('/api/register')
		.post(register);

	app.route('/api/*')
		.get((req, res) => {
			res.status('404').send('Not found');
		});
};
