const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items')

const app = express();

app.use(bodyParser.json());

const db = 'mongodb://localhost/react';

mongoose.connect(db, {  useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));


//routes
app.use('/api/items', items);

app.listen(5000, process.env.IP, function(){
   console.log("The react app Server Has Started!");
});
