import usersList from './users/list';


export default app => {
	app.get('/api/users', usersList);
};
