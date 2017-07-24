import db, { UserSchema } from '../../db';
import jwt from 'jsonwebtoken';
const Users = db.model('users', UserSchema);

export default (req, res, next) => {

	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({ message: 'No token provided' });
	}

	// this middleware doesn't verify token!
	const decoded = jwt.decode(token);

	if (!decoded) {
		return res.status(500).send('Role check failed');
	}
	const tokenOwner = decoded._doc;

	Users.findById(tokenOwner._id, (error, user) => {
		if (error || !user) {
			return res.status(500).send('Role check failed');
		}
		if (user.role !== 'admin') {
			return res.status(403).send({ message: 'You can\'t see this' });
		}
		next();
	});
};
