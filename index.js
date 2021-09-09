var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();

// Import Routes
var authRoute = require('./routes/AuthController');
var postsRoute = require('./routes/Posts');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/user', authRoute);
app.use('/posts', postsRoute);


app.listen(3000, () => console.log('Server up and running Port 3000'));
