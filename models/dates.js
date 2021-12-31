const mongoose = require('mongoose');

const datesSchema = mongoose.Schema({
	name: String, 
	type: String, 
	price: Number, 
	address: String 
	//picture?
});

module.exports = mongoose.model('Dates', datesSchema);
