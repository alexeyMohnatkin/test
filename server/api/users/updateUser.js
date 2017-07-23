import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	const { name, email, password } = req.body;

	Users.update(
		{ _id: req.params.id },
		{ name, email, password },
		{ runValidators: true },
		(error, result) => {
			if (!error) {
				return res.send({ result: 'ok' });
			}
			if (error.errors) {
				return res.status(400).send({ error });
			}
			return res.status(500).send({ error });

		});
};
