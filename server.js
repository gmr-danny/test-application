const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const superstarController = require('./controllers/superstarController');
const titleController = require('./controllers/titleController');

const PORT = process.env.PORT || 3000;

const session = require('express-session');

require('./db/db');

app.use(express.static('public'));

app.use(session({
  secret: "THIS IS THE SESSION MESSAGE",
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/roster', superstarController);
app.use('/api/titles', titleController);



app.get('/', (req, res) => {
	res.render('index.ejs', {message: req.session.message});  // show all different routes, README
});





app.listen(PORT , () => {
	console.log('app is listening!');
});
