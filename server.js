// Require Files //
const express = require('express');
const path = require('path')
const fs = require('fs');
let notes = require('./db/db.json');


//Initializing express
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware for Parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

//Get Route For reading JSON File
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => 
        
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
        res.json(JSON.parse(data));
        
    })
    
);

app.post('/api/notes', (req, res) => {
    
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: Math.floor((Math.random() * 1000))
    }
    console.log(newNote);

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile('./db/db.json', 
                JSON.stringify(parsedNotes, null, 4), 
                (writeErr) =>
            writeErr ? console.error(writeErr) : console.info('Successfully updated Notes')
        )}    
    })
    res.status(201).json();
});

//Get Route For Universal HTML Page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`APP is listening at http://localhost:${PORT}`)
);