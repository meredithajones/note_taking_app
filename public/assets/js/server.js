var express= require ('express');

var app = express();

//HTML Routes need to be created: get/notes will return the notes.html file
//get * will return the index.html file

//create API routes:
//Get /api/notes will read the db.json file and return all the saved notes as JSON
//Post /api/notes should receive a new note and save it on the 
//request body, add it to db.json file & return new note to the client.
//Delete /api/notes/:id - should recieve a query parameter containing the id of the 
//note to delete. Give each note a unique id when it is saved. 
//In order to delete, you will need to read all notes from the db.json
//remove the note wiht the given id property, and then rewrite the 
//notes to the db.json file. 