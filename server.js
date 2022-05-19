// DEPENDENCIES
const express = require('express');
const pokemon = require('./models/pokemon');
const morgan = require('./.gitignore/node_modules/morgan');
const methodOverride = require('./.gitignore/node_modules/method-override');
const res = require('express/lib/response');

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
app.get('/', (req, res)=>{
    res.render('index.ejs', { pokemon });
});
// SHOW
app.get('/:id/', (req, res)=>{
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id]
    });
});
// NEW
app.get('/new/', (req, res)=>{
    res.render('new.ejs', { pokemon });
});
// EDIT
app.get('/:id/edit', (req, res)=>{
    res.render(
        'edit.ejs',
        {
            pokemon: pokemon[req.params.id],
            index: req.params.id,
        }
    );
});
// CREATE
app.post('/', (req, res)=>{
    pokemon.push(req.body);
    res.redirect('/');
});
// UPDATE
app.put('/:id', (req, res)=>{
    // form
    pokemon[req.params.id] = req.body; // change selected value data
    res.redirect('/');
});
// DELETE
app.delete('/:id', (req, res)=>{
    pokemon.splice(req.params.id, 1);
    res.redirect('/');
});

// REQUEST LISTENER
app.listen(port, ()=>{
    console.log('Listening on port ', port);
});