const mongoose = require('mongoose');

const connectMongo = (url) => {
	mongoose.set('strictQuery', false);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'backend' }).catch((err) => {
		console.log(err, `can't connect to MongoDB`);
	});
};

module.exports = connectMongo;
