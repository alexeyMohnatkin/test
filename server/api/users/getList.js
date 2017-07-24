import db, { UserSchema } from '../../db';
const Users = db.model('users', UserSchema);

export default (req, res) => {
	// const { filter, page } = req.query;
	const perPage = 5;
	const page = req.query.page ? +req.query.page : 1;

	Users.find().limit(perPage)
		.skip(perPage * (page-1))
		.sort({
			name: 'asc'
		})
		.exec((error, users) => {
			if (error) {
				return res.status(500).send({ error });
			}
			Users.count().exec((err, count) => {
				if (error) {
					return res.status(500).send({ error });
				}

				res.send({ users, page: page, count, pages: Math.round(count / perPage) });
			});
		});
};
