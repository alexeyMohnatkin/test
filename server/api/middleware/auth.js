import jwt from 'jsonwebtoken';

export default (req, res, next) => {

	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		// if there is no token
		// return an error
		return res.status(403).send({ message: 'No token provided.' });
	}

	// decode token
	// verifies secret and checks exp
	jwt.verify(token, req.app.get('secret'), function(err, decoded) {
		if (err) {
			return res.json({ message: 'Failed to authenticate token.' });
		}
			// if everything is good, save to request for use in other routes
		req.decoded = decoded;
		next();

	});


};
