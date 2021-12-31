const mongoose = require('mongoose');

const Superstar = require('./superstar');

const defensesSchema = mongoose.Schema({

	challenger: Superstar.schema, 
	result: String

	
});

module.exports = mongoose.model('Defenses', defensesSchema);
