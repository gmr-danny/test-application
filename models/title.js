const mongoose = require('mongoose');

const Superstar = require('./superstar');
const Reigns = require('./reigns');

const titleSchema = mongoose.Schema({
	name: String, 
	history: [{reignId: String}], 

	currentChamp: {
		name: String, 
		champId: String
	}
});

module.exports = mongoose.model('Title', titleSchema);
