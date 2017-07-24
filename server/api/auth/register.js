import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	const { name, email, password } = req.body;

	const User = new Users({ name, email, password });

	User.save()
		.then((newUser) => {
			return res.send({ id: newUser._id });
		})
		.catch((error) => {
			if (error.errors) {
				const errors = Object.keys(error.errors).reduce((str, err) => {
					return str + error.errors[err].message + ' ';
				}, '');

				return res.status(400).send({ error: { message: errors } });
			}
			console.log(error);
			return res.status(500).send({ error });
		});
};
