require ("dotenv").config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const app = express();

var tokenAux = 'holaa'

// connection to db

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const routes = require('./routes/routeindex');
const user = require('./routes/user');


// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// routes
app.use('/', routes);
app.use("/user", user);
//*****new 
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})

module.exports = app;
