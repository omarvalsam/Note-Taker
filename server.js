const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

fs.readFile('db/notes.json', 'utf-8', (err, data)=> {
  if (err) throw err;
  var previousNotes = JSON.parse(data);


app.get("/api/notes", function (req, res) {
  res.json(previousNotes)
})

app.post("api/notes", function( req, res){
  let updatedNote = req.body;
  previousNotes.push(updatedNote);

  fs.writeFile("db/notes.json",JSON.stringify(notes), err => {
    if (err) throw err;
    return true;
  })
  return console.log('added new note: '+updatedNote.title);
})

app.get("api/notes/:id", function(req, res){
  res.json(previousNotes[req.params.id, 1]);
});

// this is the function that is allows for the page to access other css and js scripts
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());

// Display notes.html when /notes is accessed
app.get('/notes', function(req,res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Display index.html when all other routes are accessed
app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

})

app.listen(PORT, function() {
  console.log("API server now on PORT:" + PORT);
});