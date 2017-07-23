import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	const { name, email, password } = req.body;

	const User = new Users({ name, email, password });

	User.save((error, newUser) => {
		if (!error) {
			return res.send({ id: newUser._id });
		}
		if (error.errors) {
			return res.status(400).send({ error });
		}
		return res.status(500).send({ error });
	});

	// res.send({ result: ok });
	// Users.insert(
	// 	{ name, email, password },
	// 	{writeConcern: true},
	// 	(error, result) => {


	// 		res.send({ result: 'ok' });
	// 	});
};
