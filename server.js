// Require Files //
const express = require('express');
const fs = require('fs');
const notes = require('./db/db.json');

//Initializing express
const app = express;
const PORT = 3001;

//Middleware for Parsing JSON and urlencoded form data
app.request(express.json());
app.request(express.urlencoded({ extended: true}));

app.request(express.static('public'));

//Get Route For Universal HTML Page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Get Route For reading JSON File
app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('api/notes', (req, res) => res.json(notes));

app.post('api/notes', (req, res) => {

});