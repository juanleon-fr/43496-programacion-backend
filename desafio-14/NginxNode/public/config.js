require('dotenv').config();
const parseArgs = require('minimist');
const { addListener } = require('./models/userModel');

const args = parseArgs(process.argv.slice(2));
addListener
module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	HOST: process.env.HOST || '127.0.0.1',
	PORT: parseInt(process.argv[2]) || 8080,
	DATABASEURL: process.env.DATABASEURL,
};