const express = require('express');
const router  = express.Router();
const Superstar = require('../models/superstar');



router.get('/', async (req, res) => {
	try {
		const allSuperstar = await Superstar.find({});
		res.send(allSuperstar);

	} catch (err) {
		res.send(err); 
	}
});



//Temporary
router.get('/new', async (req, res) => {
	try {
		const allSuperstar = await Superstar.find({});
		res.render('wwe/editForm.ejs', {allSuperstar: allSuperstar});

	} catch (err) {
		res.send(err); 
	}
})


router.post('/', async (req, res) => {

	try {
		//const created = await Superstar.create(req.body); 
		let temp = {
			name: req.body.name, 
			brand: req.body.brand, 
			pic: req.body.pic,
			sdChamp:0, 
			rawChamp:0,
			nxtChamp:0,
			tagChamp:0
		};
		const created = await Superstar.create(temp);

		res.redirect('/api/roster/new');

	} catch (err) {
		res.send(err); 
	}
});

// PUT
router.put('/:id', async (req, res) => {
	try {
		const updatedSuperstar = await Superstar.findByIdAndUpdate(req.params.id, req.body, {new:true});
		res.redirect('/api/roster/new');

	} catch(err) {
		res.send(err);
	}
});


// DELETE
router.delete('/:id', (req, res) =>{
	Superstar.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) {
			res.send(err); 
		} else {
			res.redirect('/api/roster/new');
		}
	});
});



module.exports = router;
