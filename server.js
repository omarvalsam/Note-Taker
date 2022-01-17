const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// Display notes.html when /notes is accessed
app.get('/notes', function(req,res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Display index.html when all other routes are accessed
app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.listen(PORT, function() {
  console.log("API server now on PORT:" + PORT);
});