var express = require('express');
var cors = require('cors');

var app = express();

var dotenv = require('dotenv');
dotenv.config();
var PORT = process.env.PORT || 5500;


app.use(cors());
// Import Routes
var auth = require('./routes/Auth.route');
var private = require('./routes/Private.route');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/user', auth);
app.use('/private', private);


app.listen(PORT, () => console.log('Server up and running on PORT ' + PORT));
