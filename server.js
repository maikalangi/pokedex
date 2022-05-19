// DEPENDENCIES
const express = require('express');
const pokemon = require('./models/pokemon');
const morgan = require('morgan');
const methodOverride = require('method-override');

// APPLICATION INITIALIZATION
const app = express();

// APPLICATION CONFIGURATION
const port = 3000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// =========ROUTES===============

// INDEX

// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

// REQUEST LISTENER
app.listen(port, ()=>{
    console.log('Listening on port ', port);
});