import http from 'http';
import app from '../server';

const server = http.createServer(app);
let currentApp = app;
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on ${PORT}...`);
});

if (module.hot) {
	module.hot.accept('../server', () => {
		server.removeListener('request', currentApp);
		server.on('request', app);
		currentApp = app;
	});
}
