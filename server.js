// DEPENDENCIES
const express = require('express');
const pokemon = require('./models/pokemon');
const morgan = require('./node_modules/morgan');
const methodOverride = require('./node_modules/method-override');
const res = require('express/lib/response');

// APPLICATION INITIALIZATION
const app = express();

// APPLICATION CONFIGURATION
const port = 3000;

// MIDDLEWARE
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// =========ROUTES===============

// DATA CHECK
app.get('/data/', (req, res)=>{
    res.send(pokemon);
});

// INDEX
app.get('/', (req, res)=>{
    res.send('Hello World');
});
app.get('/pokemon/', (req, res)=>{
    res.render('index.ejs', { 
        pokemon,
        tabTitle: 'Pokedex',
    });
});
// NEW
app.get('/pokemon/new/', (req, res)=>{
    res.render('new.ejs', { 
        pokemon,
        tabTitle: 'New Entry',
    });
});
// SHOW
app.get('/pokemon/:id/', (req, res)=>{
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id],
        tabTitle: pokemon[req.params.id],
    });
});
// EDIT
app.get('/pokemon/:id/edit', (req, res)=>{
    // console.log(pokemon[req.params.id]);
    res.render(
        'edit.ejs',
        {
            pokemon: pokemon[req.params.id],
            index: req.params.id,
            tabTitle: pokemon[req.params.id] + ' Edit Page',
        }
    );
    // console.log(pokemon[req.params.id]);
});
// CREATE
app.post('/pokemon/', (req, res)=>{
    pokemon.push(req.body);
    console.log(req.body);
    res.redirect('/');
});
// UPDATE
app.put('/pokemon/:id', (req, res)=>{
    // form
    pokemon[req.params.id] = req.body; // change selected value data
    res.redirect('/');
});
// DELETE
app.delete('/pokemon/:id', (req, res)=>{
    pokemon.splice(req.params.id, 1);
    res.redirect('/');
});
//=============================

// REQUEST LISTENER
app.listen(port, ()=>{
    console.log('Listening on port ', port);
});