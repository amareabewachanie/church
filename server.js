const express = require('express');
const mongoose = require('mongoose');

// API end points
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
// Creating an express server
const app = express();
//configure mongo db
const db = require('./config/keys').mongoURI;
//connect to mongo db
mongoose
    .connect(db)
    .then(() => console.log('Data base connected successfully!'))
    .catch((err) => console.log(err));

app.get('/', (req, res, next) => {
    res.send('hello');
});

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Hello port ${port}`);
});
