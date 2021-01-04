// Dependencies

var express= require ('express');

// Sets up the Express App
var app = express();

//Using process.env.port to enable heroku to select a port # is 3001 is not available. 
var PORT = process.env.PORT || 3001;


//Post /api/notes should receive a new note and save it on the 
//request body, add it to db.json file & return new note to the client.
//Delete /api/notes/:id - should recieve a query parameter containing the id of the 
//note to delete. Give each note a unique id when it is saved. 
//In order to delete, you will need to read all notes from the db.json
//remove the note wiht the given id property, and then rewrite the 
//notes to the db.json file. 

// Setting up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

//HTML Routes:
// get/notes will return the notes.html file
//get * will return the index.html file

app.get("/notes",(req, res) => 
  res.sendFile(path.join(__dirname, "notes.html")));


app.get("/*", (req, res) => 
    res.sendFile(path.join(__dirname, "index.html")));

//Creating API routes:
//Get /api/notes will read the db.json file and return all the saved notes as JSON

app.get("/api/notes", (req,res) =>
    return res.json(notes);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
