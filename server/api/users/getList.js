import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	// const { filter, page } = req.query;

	Users.find((error, users) => {
		if (error) {
			return res.status(500).send({ error });
		}

		res.send({ users });
	});
};
