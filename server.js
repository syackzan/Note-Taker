// Require Files //
const express = require('express');
const path = require('path')
const fs = require('fs');


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

// GET Request to read and return data stored in db.json
app.get('/api/notes', (req, res) => 
        
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
        res.json(JSON.parse(data));
    })
    
);

// POST request to add a new note into the db.json file
app.post('/api/notes', (req, res) => {
    
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: Math.floor((Math.random() * 1000))
    }

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

app.delete("/api/notes/:id", (req, res) => {
    //Storing ID that was selected from req.params
    const requestedId = req.params.id
    console.log(requestedId);

    //Looping through Json File To Delete specified Channel

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
       let parsedData = JSON.parse(data);

       for (let i = 0; i < parsedData.length; i++){
           if (requestedId == parsedData[i].id){
               parsedData.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4),
                (writeErr) => writeErr ? console.error(writeErr) : console.info("Successfully Deleted & Updated"))
            res.status(201).json();
           } else {
            res.status(404).json({ message: "Channel you are looking for does not exist"});
           }
       }
    })

    
});

//Get Route For Universal HTML Page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Event Listener For the Host Port
app.listen(PORT, () =>
    console.log(`APP is listening at http://localhost:${PORT}`)
);