'use strict';

const app = require('./src/Routes');

const mongoose = require('mongoose');
const connection = 'mongodb://mongo:27017/<TODO_YOUR_APP_DB>';
const PORT = 8080;

app.listen(PORT, async function() {
	console.log(`Listening on ${PORT}`);
	try {
		await mongoose.connect(connection);
		console.log('DB connected');
		return true;
	} catch(error) {
		console.log(error);
		throw error;
	}
});