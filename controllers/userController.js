const express = require('express');
const router  = express.Router();
const Users = require('../models/users');
const Dates = require('../models/dates');


// var upload = multer({ dest: 'uploads/' });


// "admin" page --- to show all users 
router.get('/', (req, res) => {

	Users.find({}, (err, allUsers) => {
		if (err) {
			res.send(err);
		} else {
			res.render('users/index.ejs', {
				user: allUsers
			});

		}
	})
})


// temporary delete page 

router.delete('/:id', (req, res) =>{
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if (err) {
			res.send(err); 
		} else {
			res.redirect('/user');
		}
	});
});




// Edit Profile Page
router.get('/:id/profile', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		res.render('users/edit.ejs', {
			user: profile
		})
	} catch (err) {
		res.send(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});
		const profile = await Users.findById(req.params.id);

		
		res.redirect(`/user/${req.params.id}/preferences`);


	} catch (err) {
		res.send(err);
	}
});





// the type of dates you are looking for 

router.get('/:id/preferences', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		res.render('users/preferences.ejs', {
			user: profile
		})
	} catch (err) {
		res.send(err);
	}
});


router.put('/preferences/:id', async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});

		res.redirect(`/user/${req.params.id}/looking`);
	} catch (err) {
		res.send(err);
	}
});




// the type of people you are looking for 

router.get('/:id/looking', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		res.render('users/looking.ejs', {
			user: profile
		});
	} catch (err) {
		res.send(err);
	}
});


router.put('/looking/:id', async (req, res) => {
	console.log(typeof req.body.maxAge);
	try {

		const profile = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});


		res.redirect(`/user/${req.params.id}/ready`);
	} catch (err) {
		res.send(err);
	}
});





// Edit Entire User
router.get('/:id/full', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		res.render('users/fullEdit.ejs', {
			user: profile
		});
	} catch (err) {
		res.send(err);
	}
});

router.put('/full/:id', async (req, res) => {
	try {
		const profile = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});
		res.redirect(`/user/${req.params.id}/ready`);
	}catch (err) {
		res.send(err);
	}
});


router.get('/:id/ready', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);

		const potential = await Users.find(
			{ 
				preferredDates: 
					{ $in: profile.preferredDates }, 
				gender: 
					{ $in: profile.preferredGender}, 
				age: 
					{ $gte: profile.minAge, 
					  $lte: profile.maxAge},
				minAge: 
					{
						$lte: profile.age
					},
				maxAge: 
					{
						$gte: profile.age
					},
				preferredGender: profile.gender,

				_id: 
					{ $ne: profile._id, 
						$nin: profile.likedUsers}

				// not already in your liked list

			});
		console.log('POTENTIAL =============');
		console.log(potential);



		profile.availableUsers = potential;
		const data =  await profile.save();
		console.log('PROFILE =============');
		console.log(profile);

		res.render('main/ready.ejs', {
			user: profile
		});
	} catch (err) {
		res.send(err);
	}
});


// ============= Match =============

router.get('/:id/match',  (req, res) => {


	res.render('main/match.ejs');

});


// ============== Main =================

router.get('/:id/main', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);

		if (profile.availableUsers.length > 0) {

			res.render('main/swipe.ejs', {
				user: profile, 
				match: profile.availableUsers[0]
			})
		} else {
			res.render('main/nodates.ejs', {
				user: profile
			})
		}

		//console.log(profile);

	} catch (err) {
		res.send(err);
	}
});




router.put('/main/:id', async (req, res) => {
	try {

		const profile = await Users.findById(req.params.id);
		const temp = profile.availableUsers.shift();
		const data = await profile.save();

		if (req.body.match === 'like') {
			profile.likedUsers.push(temp);
			const liked = await profile.save();

			let matched = false;
			for (let a = 0; a < temp.likedUsers.length; a++) {
				if (temp.likedUsers[a]._id.toString().trim() == profile._id.toString().trim()) {

					matched = true;
				}

			
			}


			if (matched) {

				profile.matches.push(temp);
				const save = await profile.save();


				//temp.matches.push(profile);
				//const tempSave = await temp.save(); // this temp might be referencing a different object 

				const possibleDates = await Dates.find({
					type: 
						{ $in: profile.preferredDates}
				});

				res.render('main/match.ejs', {
					you: profile.name, 
					match: temp.name, 
					dates: possibleDates, 
					user: profile
				});

			} else {
				res.redirect(`/user/${profile.id}/main`);

			}

		} else if (req.body.match === 'pass') {

			// do nothing 
			res.redirect(`/user/${profile.id}/main`);

		}







	} catch (err) {
		res.send(err);
	}
});


// ============== view my matches ===========
router.get('/:id/my-matches', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);

		console.log(profile);

		res.render('main/mymatches.ejs', {
			user:  profile,
			allMatches: profile.matches
		})


	} catch (err) {
		res.send(err);
	}
});



// ======= delete match ====== 

router.put('/my-matches/:id', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);

		profile.matches.splice(req.body.removeMatch, 1);

		const data = await profile.save();

		res.redirect(`/user/${profile._id}/my-matches`);


	} catch (err) {
		res.send(err);
	}
});



module.exports = router;
