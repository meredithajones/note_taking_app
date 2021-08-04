// Dependencies
const express= require ('express');
//setting up random number generator to create unique note ids
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path= require ('path');

// Sets up the Express App
const app = express();

//Using process.env.port to enable heroku to select a port # is 3001 is not available. 
var PORT = process.env.PORT || 3001;


// Setting up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Adding static path 
app.use(express.static("public"));


//HTML Routes:
// get/notes will return the notes.html file
//get * will return the index.html file
app.get("/notes",(req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

//Creating API routes:
//Get /api/notes will read the db.json file and return all the saved notes as JSON
app.get("/api/notes", (req,res) =>{
    //res.sendFile(path.join(__dirname,")db/db.json"))
    //read file
    var notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
      res.json(notes)
      // .catch((err) => res.status(500).json(err));
});

// Get an individual note: 
app.get("/api/notes/:note", (req, res) => {
    var singleNote = req.params.note;
    console.log(singleNote);
    res.json(singleNote)      
  });

//Post /api/notes should receive a new note and save it on the 
//request body, add it to db.json file & return new note to the client.
app.post("/api/notes",(req, res ) => {
    console.log("note", req.body)
    const {title, text} = req.body;
    //Creating new note object and assigning id generator
    const newNote = { title, text, id: uuidv4()};
    const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newNotes = [...notes, newNote];
   fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
   res.json(newNote)
    }); 

//Delete /api/notes/:id - should recieve a query parameter containing the id of the 
//note to delete. Give each note a unique id when it is saved. 
//In order to delete, you will need to read all notes from the db.json
//remove the note with the given id property, and then rewrite the 
//notes to the db.json file. 

// Use app.delete
  app.delete("/api/notes/:id", (req,res) => {
      let newNotes;
      let id = req.params.id
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => { 
      if (err) throw err;
      // save the object array from db.json in notes
      let notes = JSON.parse(data)
      newNotes = notes.filter((note) => note.id !== id);
      console.log("Filter", newNotes)
      fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));

    })  
    
  
  //rewrite the notes to the db.json file
      //Send response back to client
      res.json({ok: true});
      res.end(); 

});
 

//  // rewrite the notes to the db.json file
//     fs.writeFile(__dirname + "/db/db.json", JSON.stringify(newNotes), (err, data) => {
//       if (err) throw err;
//     //   //send response back to client
//       res.json(newNotes)  
//     });

//CSS Route
app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/assets/css/styles.css")
});

// Starts the server listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)
});
