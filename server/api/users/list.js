
export default (req, res) => {
	const { filter, page } = req.query;

	const users = [
		{
			id: 1,
			name: 'User1'
		},
		{
			id: 2,
			name: 'User2'
		},
	];

	try {
		const result = {
			users,
		};

		res.send({ result });
	} catch (error) {
		res.status(500).send({ error });
	}
};
