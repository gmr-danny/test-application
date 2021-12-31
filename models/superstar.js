const mongoose = require('mongoose');

const superstarSchema = mongoose.Schema({
	name: String, 
	sdChamp: Number, 
	rawChamp: Number, 
	nxtChamp: Number, 
	tagChamp: Number, 
	brand: String, //raw, sd, nxt
});

module.exports = mongoose.model('Superstar', superstarSchema);
