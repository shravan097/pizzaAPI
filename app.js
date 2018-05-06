var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');


//MY STUFF
const mongoose = require('mongoose')
const mongoDB = 'mongodb://cs332:password@ds115569.mlab.com:15569/api';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;


//db connection
const db = mongoose.connection;


//Error Check
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//User Route
const users = require('./routes/users');
//Store Route
const store = require('./routes/storeRoutes');
//Chef Route
const chef = require('./routes/chefRoutes');

//Customer Route
const customer = require('./routes/customerRoutes');

//Manager Routes
const manager = require('./routes/managerRoutes');

//Delivery Routes
const delivery = require('./routes/deliveryRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

//Route for stores
app.use('/store',store)
app.use('/', users);
app.use('/chef',chef);
app.use('/customer',customer);
app.use('/manager',manager);
app.use('/delivery',delivery);


app.post('/sendsms', bodyParser.json(), (req, res) => {
  var client = require('twilio')('ACc688dea366759db0a4508fdb961cd7ad', '374464ffcd050e7fad0991f055481327');
  client.sendMessage({
    to: '+9144716528',
    from: '+8459996707',
    body: 'word to your mother.'
  }, function (err, responseData) {
      console.log('this works!');
    if (!err) {
      return res.status(200).json({"From": responseData.from, "Body": responseData.body});
    }else{
      return res.status(500).json({"Error":err});
    }
  })
})

//app.listen(process.env.PORT || 3000);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send("Not Found!")
});

module.exports = app;
