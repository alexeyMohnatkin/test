import mongoose, { Schema } from 'mongoose';
import beautifyUnique from 'mongoose-beautiful-unique-validation';
import { database } from './config';

mongoose.connect(database);
const db = mongoose.connection;

db.on('error', function(err) {
	console.error('connection error:', err.message);
});
db.once('open', function callback() {
	console.info('Connected to DB');
});

export default db;

export const UserSchema = new Schema({
	name: {
		type: String,
		required: 'Name is required',
		unique: 'Name already exists',
	},
	email: {
		type: String,
		required: 'Email is required',
		unique: 'Email already registered',
	},
	password: { type: String, required: true },
	role: {
		type: String,
		default: 'user',
		required: true,
		enum: {
			values: ['user', 'admin'],
			message: 'enum validator failed for path `{PATH}` with value `{VALUE}`',
		},
	},
});

UserSchema.plugin(beautifyUnique);
