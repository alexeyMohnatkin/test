import getUsersList from './users/getList';
import getUser from './users/getUser';
import updateUser from './users/updateUser';
import addUser from './users/addUser';
import deleteUser from './users/deleteUser';

export default (app) => {
	app.route('/api/users')
		.get(getUsersList)
		.post(addUser);
	app.route('/api/users/:id')
		.get(getUser)
		.put(updateUser)
		.delete(deleteUser);

	app.route('/api/*')
		.get((req, res) => {
			res.status('404').send('Not found');
		});
};
