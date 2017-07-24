import jwt from 'jsonwebtoken';
import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	const { email, password } = req.body;
  // find the user

	Users.findOne({ email }, (error, user) => {

		if (!user) {
			res.status(401).send({ message: 'Authentication failed. User not found' });
		} else if (user) {

      // check if password matches
			if (user.password !== password) {
				res.status(401).send({ message: 'Authentication failed. Wrong password' });
			} else {
        // if user is found and password is right
        // create a token
				const token = jwt.sign(user, req.app.get('secret'), {
					// expires in 24 hours
					expiresIn: 60*60*24,
				});

        // return the information including token as JSON
				res.send({
					token: token,
					credentials: user,
				});
			}
		}

		if (error) {
			return res.status(500).send({ error });
		}

	});
};
