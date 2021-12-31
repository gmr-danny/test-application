const express = require('express');
const router  = express.Router();
const Dates = require('../models/dates');



router.get('/', async (req, res) => {

	try {
		const allDates = await Dates.find({});
		res.render('dates/index.ejs', {
			dates: allDates
		})

	} catch (err) {
		res.send(err); 
	}


});

router.post('/', async (req, res) => {
	try {
		const created = await Dates.create(req.body); 

		res.redirect('/dates');

	} catch (err) {
		res.send(err); 
	}
});




module.exports = router;
