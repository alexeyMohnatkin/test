import mongoose, { Schema } from 'mongoose';
// import log from './log';

mongoose.connect('mongodb://localhost/shakacode');
const db = mongoose.connection;

db.on('error', function(err) {
		// log.error('connection error:', err.message);
	console.error('connection error:', err.message);
});
db.once('open', function callback() {
		// log.info("Connected to DB!");
	console.info('Connected to DB');
});

export default db;


export const UserSchema = new Schema({
	name: {
		type: String,
		required: 'Name is required',
		unique: 'Name already exists'
	},
	email: {
		type: String,
		required: 'Email is required',
		unique: 'Email already registered'
	},
	password: { type: String, required: true },
	// buff: Buffer
});
