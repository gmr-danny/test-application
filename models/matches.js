const mongoose = require('mongoose');
const User = require('./users');
const Dates = require('./dates');

const matchesSchema = mongoose.Schema({
	requester: User.schema, 
	recipient: User.schema, 
	date: Dates.schema, 
	accepted: Boolean
});

module.exports = mongoose.model('Matches', matchesSchema);
