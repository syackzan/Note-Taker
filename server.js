// Require Files //
const express = require('express');
const path = require('path')
const fs = require('fs');
const notes = require('./db/db.json');

//Initializing express
const app = express();
const PORT = 3001;

//Middleware for Parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

//Get Route For Universal HTML Page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Get Route For reading JSON File
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('api/notes', (req, res) => res.json(notes));

// app.post('api/notes', (req, res) => {
//     let data = req.body;
//     const {title, text} = data;
// });

app.listen(PORT, () =>
    console.log(`APP is listening at http://localhost:${PORT}`)
);