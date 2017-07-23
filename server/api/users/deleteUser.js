import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	Users.findById(req.params.id)
		.remove((error, result) => {
			if (!error) {
				return res.send({ result: 'ok' });
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
