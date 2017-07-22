const fs = require('fs-extra');
const path = require('path');

fs.copySync(path.resolve(__dirname, '../public'), path.join(__dirname, '../build'), {
	dereference: true,
});
