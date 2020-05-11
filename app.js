var express        = require("express"),
    app            = express(),
    http           = require("http"),
    server         = http.createServer(app),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose');

var TVShowCtrl = require('./controllers/tvshows');

// API routes
var tvshows = express.Router();
tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);
//----

mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});
require('./models/tvshow');

app.use('/api', tvshows);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

tvshows.get('/', function(req, res) {
   res.send("Hello World!");
});

tvshows.get('/tvshows', function(req, res) {
  console.log("tvshows::::::::", tvshows)
  res.json(tvshows)
});

app.use(tvshows);

server.listen(3001, function() {
  console.log("Node server running on http://localhost:3001");
});