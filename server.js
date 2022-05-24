// DEPENDENCIES
const express = require('express');
const pokemon = require('./models/pokemon');
const morgan = require('morgan');
const methodOverride = require('method-override')
const res = require('express/lib/response');
const { json } = require('express/lib/response');

// APPLICATION INITIALIZATION
const app = express();

// APPLICATION CONFIGURATION
const port = 3001;

// MIDDLEWARE
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// =========ROUTES===============

// DATA CHECK
app.get('/data/', (req, res)=>{
    res.send(pokemon[0].moves);
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
        tabTitle: 'New Entry',
    });
});

// DELETE
app.delete('/pokemon/:id', (req, res)=>{
    pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon/');
});

// UPDATE
app.put('/pokemon/:id', (req, res)=>{
   console.log(req.body.type);
    pokemon[req.params.id].name=req.body.name;
    pokemon[req.params.id].type=req.body.type;
    pokemon[req.params.id].stats.hp=req.body.hp;
    pokemon[req.params.id].stats.attack=req.body.attack;
    pokemon[req.params.id].stats.defense=req.body.defense;
    // pokemon[req.params.id] = req.body;
    res.redirect('/pokemon/');
});

// CREATE
app.post('/pokemon/', (req, res)=>{
    pokemon.unshift(req.body);
    console.log(req.body);
    res.redirect('/pokemon/');
});

// EDIT
app.get('/pokemon/:id/edit', (req, res)=>{
    res.render(
        'edit.ejs',
        {
            pokemon: pokemon[req.params.id],
            index: req.params.id,
            tabTitle: pokemon[req.params.id].name,
        }
    );
});

// SHOW
app.get('/pokemon/:id/', (req, res)=>{
    console.log(pokemon[req.params.id].name);
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id],
        tabTitle: pokemon[req.params.id].name,
    });
});

//=============================

// REQUEST LISTENER
app.listen(port, ()=>{
    console.log('Listening on port ', port);
});