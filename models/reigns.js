const mongoose = require('mongoose');

const Superstar = require('./superstar');
const Defenses = require('./defenses');

const reignsSchema = mongoose.Schema({
	// titleId? 
	term: {type: Number , unique: true}, 
	// champ: Superstar.schema, 
	champ: {
		name: String, 
		champId: String
	},
	reignNumber: Number, 
	defenses: [
		{
			challenger: String, 
			result: String
		}
	]

});

module.exports = mongoose.model('Reigns', reignsSchema);
