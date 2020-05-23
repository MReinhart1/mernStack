const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path")

const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

const app = express();

app.use(bodyParser.json());

const db = 'mongodb://localhost/react';

mongoose.connect(db, {  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

//Seve static assets if in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

//routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', users);

app.listen(5000, process.env.IP, function(){
   console.log("The react app Server Has Started!");
});
