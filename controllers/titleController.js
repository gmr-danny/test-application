const express = require('express');
const router = express.Router();
const Defenses = require('../models/defenses');
const Superstar = require('../models/superstar');
const Reigns = require('../models/reigns');
const Titles = require('../models/title');

//GET: edit page (temporary)
router.get('/edit', async (req, res) => {
	try {
		const allSuperstar = await Superstar.find({});
		const allTitles = await Titles.find({});
		res.render('wwe/editTitles.ejs', {allSuperstar: allSuperstar, allTitles: allTitles});

	} catch (err) {
		res.send(err); 
	}
})

//GET: Add champion (temporary)
router.get('/edit/:id', async (req, res) => {
	try {
		const title = await Titles.findById(req.params.id);
		const allSuperstars = await Superstar.find({});

		const reignList = []; 
		for (let a = 0; a < title.history.length; a++) {
			const foundReign = await Reigns.findById(title.history[a].reignId);
			reignList.push(foundReign);
		}

		res.render('wwe/addChampion.ejs', {title: title, allSuperstars: allSuperstars, reignList: reignList});  

	} catch (err) {
		res.send(err); 
	}
})

//GET: add defense (temporary)
router.get('/manageDefenses/:reignid', async (req, res) => {
	try {
		const foundReign = await Reigns.findById(req.params.reignid);

		const allSuperstars = await Superstar.find({});
		res.render('wwe/addDefenses.ejs', {allSuperstars: allSuperstars, reign: foundReign});  

	} catch (err) {
		res.send(err); 
	}
})

// GET: all reigns 
router.get('/reigns', async (req, res) => {
	try {
		const allReigns = await Reigns.find({});
		res.send(allReigns);

	} catch (err) {
		res.send(err); 
	}
});

// GET: all titles simplified (name, current Champ)
router.get('/', async (req, res) => {
	try {
		const allTitles = await Titles.find({});
		res.send(allTitles);

	} catch (err) {
		res.send(err); 
	}
});



// GET by id: detailed of title including history and reigns



// POST, create new title

router.post('/', async (req, res) => {

	try {
		const created = await Titles.create(req.body);

		res.redirect('/api/titles/edit');
	} catch (err) {
		res.send(err); 
	}
});

// PUT, add champion
router.put('/addChampion/:id', async (req, res) => {

	try {
		const title = await Titles.findById(req.params.id); 


		let champion = await Superstar.findById(req.body.champId);

		// Count ReignNumber

		// Find all reigns with same champ id 
		const reignList = await Reigns.find({
			'champ.champId': champion._id,
			'titleType': title.name
		}).sort({'reignNumber': "descending"});

		console.log("reignList", reignList)
		const newReignNum = reignList.length !== 0 ? reignList[0].reignNumber + 1 : 1;

		let newReign = {
			champ: {name: champion.name, champId: champion._id},
			term: title.history.length + 1, 
			reignNumber: newReignNum,
			titleType: title.name
		}

		// create reign 
		const createdReign = await Reigns.create(newReign);

		let newHistory = JSON.parse(JSON.stringify(title.history));

		newHistory.push({reignId: createdReign._id});

		let newTitle = {
			name: title.name, 
			history: newHistory,
			currentChamp: {name: champion.name, champId: champion._id}
		}

		// update title
		const updatedTitle = await Titles.findByIdAndUpdate(req.params.id, newTitle, {new: true});
		// update superstar 

		const updatedSuperstar = await Superstar.findByIdAndUpdate(req.body.champId, {[`${title.name}Champ`]: newReignNum}, {new: false});

		// redirect to list details of title.
		res.redirect('/api/titles/edit/'+req.params.id);

	} catch(err) {
		console.log("err", err)

		res.send(err);
	}

});

//PUT, remove champ --- [temporary]
router.put('/deleteChampion/:id', async (req, res) =>{
	try {
		const title = await Titles.findById(req.params.id); 

		// loop through, delete all reigns
		for(let a = 0; a < title.history.length; a++) {
			Reigns.findByIdAndRemove(title.history[a].reignId, (err, deleted) => {
				if (err) {
					res.send(err);
				}
			})
		}

		let newTitle = {
			history: [],
			currentChamp: null
		}


		// update title
		const updatedTitle = await Titles.findByIdAndUpdate(req.params.id, newTitle, {new: false});


		// redirect to list details of title.
		res.redirect('/api/titles/edit/'+req.params.id);

	} catch(err) {
		console.log("err", err)
		res.send(err);
	}
});



// PUT, add defense 

router.put('/addDefense/:id', async (req, res) =>{

	try {
		console.log("what", req.params.id)
		const reign = await Reigns.findById(req.params.id);
		console.log("reign", reign)
		let newReign = JSON.parse(JSON.stringify(reign));
		console.log("newDefense", reign, newReign)

		let defense = {
			challenger: req.body.challenger, 
			result: req.body.result
		};

		newReign.defenses.push(defense); 

		const updatedReign = await Reigns.findByIdAndUpdate(req.params.id, newReign, {new: false});
		// update title 


		res.redirect('/api/titles/manageDefenses/' + req.params.id);

	} catch(err) {
		console.log("error", err)
		res.send(err);
	}
});


// DELETE: a title (not needed?)





module.exports = router;