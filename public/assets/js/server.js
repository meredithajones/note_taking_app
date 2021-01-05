// Dependencies

var express= require ('express');
var path= require ('path');

// Sets up the Express App
var app = express();

//Using process.env.port to enable heroku to select a port # is 3001 is not available. 
var PORT = process.env.PORT || 3001;


// Setting up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Adding static path 
app.use(express.static(path.join(__dirname, "public")));


// Routes
// Sending the user to first AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

//HTML Routes:
// get/notes will return the notes.html file
//get * will return the index.html file
app.get("/notes",(req, res) => 
  res.sendFile(path.join(__dirname, "notes.html")));


app.get("/", (req, res) => 
    res.sendFile(path.join(__dirname, "index.html")));

//Creating API routes:
//Get /api/notes will read the db.json file and return all the saved notes as JSON
app.get("/api/notes", (req,res) =>
    res.sendFile(path.join(__dirname,")db/db.json")));

// Get an individual note: 
app.get("/api/notes/:note", (req, res) => {
    var singleNote = req.params.note;
    console.log(singleNote);
    res.json(singleNote)      
  });

//Post /api/notes should receive a new note and save it on the 
//request body, add it to db.json file & return new note to the client.
app.post("/api/notes",(req, res ) => {
    //Error handling
    if (err) throw err;
    const newNotes = JSON.parse(data) 
    //Add the new note to storage and give it an id
    const addNote = {
        id: newNotes.index,
    }

  //Push new note to the array
  newNotes.push(req.body);

  //Write new array of notes and strinify 
  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(newNotes), (err, data) => {
    if (err) throw err;  
    res.json(newNotes)         
    });  
    //Send the note back to client
    res.sendFile(path.join(__dirname, "public/notes.html"));
    }); 

//Delete /api/notes/:id - should recieve a query parameter containing the id of the 
//note to delete. Give each note a unique id when it is saved. 
//In order to delete, you will need to read all notes from the db.json
//remove the note with the given id property, and then rewrite the 
//notes to the db.json file. 

app.delete("/api/notes/:id", (req, res) => {
  // 
  fs.readFile(__dirname + "/db/db.json", (err, data) => { 
    if (err) throw err;
    // save the array from db.json in notes
    let newNotes = JSON.parse(data)
    // storing the element that we want to delete
    const note = newNotes.find(n => n.id === parseInt(req.params.id));
    // getting the index of the element we want to delete. id: 3 = index = 2
    const index = newNotes.indexOf(note);
    // remove just the one note that we want to delete based our choice on its index.
    notes.splice(index, 1);


 // rewrite the notes to the db.json file
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(newNotes), (err, data) => {
      if (err) throw err;
      //send response back to client
      res.json(newNotes)  



//CSS Route
app.get("/notes", (req, res) => 
res.sendFile(__dirname + "/public/assets/css/styles.css"));

//JS Route
app.get("/notes", (req, res) => 
res.sendFile(__dirname + "/public/assets/js/index.js"));

// Starts the server listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
