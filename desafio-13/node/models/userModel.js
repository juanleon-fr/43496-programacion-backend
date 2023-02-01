const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, max: 100 },
	password: { type: String, required: true, max: 100 },
});
userSchema.plugin(findOrCreate);

const Usuarios = mongoose.model('usuarios', userSchema);
module.exports = Usuarios;
