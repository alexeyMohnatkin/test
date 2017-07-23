import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res, next) => {
	Users.findById(req.params.id, (error, user) => {
		if (!error) {
			return res.send({ user });
		}
		return res.status(404).send('User not found');

	});
};
