import { connect, set } from 'mongoose';

const connectMongo = (url) => {
	set('strictQuery', false);
	connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'backend' }).catch((err) => {
		console.log(err, `can't connect to MongoDB`);
	});
};

export default connectMongo;
