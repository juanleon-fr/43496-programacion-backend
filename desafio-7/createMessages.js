const { optionsSQLite } = require('./options/sqlite.js');

const knex = require('knex')(optionsSQLite);

knex.schema.createTable('accounts', table => {

})


knex.schema
	.createTable('messages', (table) => {
		table.increments('id'), table.string('socketid'), table.string('timestamp'), table.string('email'), table.string('mensaje');
	})
	.then(() => {
		console.log('tabla creada');
	})
	.catch((err) => {
		console.log(err);
		throw new Error(err);
	})
	.finally(() => {
		knex.destroy();
	});

knex('messages')
	.insert([
		{
			socketid: '1111111111',
			timestamp: '123123132',
			email: 'ricardodarin@gmail.com',
			mensaje: 'Hola Guille',
		},
		{
			socketid: '2222222222',
			timestamp: '123123132',
			email: 'ricardodarin@gmail.com',
			mensaje: 'Cómo te va papá?',
		},
		{
			socketid: '1111111111',
			timestamp: '123123123',
			email: 'francellaguille@gmail.com',
			mensaje: 'Todo piola por aca ricky',
		},
	])
	.then(() => {
		console.log('insert successful');
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		knex.destroy();
	});
