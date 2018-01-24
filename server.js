var express                    = require('express'),
    passport                   = require('passport'),
    bodyParser                 = require('body-parser'),
    mongoose                   = require('mongoose'),
    LocalStrategy              = require('passport-local'),
    ejs                        = require('ejs'),
    RouteIndex                 = require('./routes/index');

var urldb         = "mongodb://joselee:joselee@ds255787.mlab.com:55787/image-search-al";
mongoose.connect(urldb);
var app                        = express();
app.set('view engine','ejs');
// app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static('app/controllers'));
app.use(RouteIndex);

var PORT = 8080;
app.listen(process.env.PORT || PORT,()=>{
  console.log('application started and listening at port '+ PORT);
});