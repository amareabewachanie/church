const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// API end points
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
// Creating an express server
const app = express();

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure mongo db
const db = require('./config/keys').mongoURI;
//connect to mongo db
mongoose
    .connect(db)
    .then(() => console.log('Data base connected successfully!'))
    .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);
//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Hello port ${port}`);
});
