const { connect, set } = require('mongoose');

const connectMongo = (url) => {
	set('strictQuery', false);
	connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'backend' }).catch((err) => {
		console.log(err, `can't connect to MongoDB`);
	});
};

module.exports = connectMongo;
