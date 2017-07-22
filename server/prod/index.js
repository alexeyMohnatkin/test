import http from 'http';
import app from '../server';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on ${PORT}...`);
});

