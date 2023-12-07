# Note Taker 


Create a db.json file that stores and retrieves notes using the fs module.

* Created the following HTML routes :

- GET /notes that returns the notes.html file.

- GET * that returns the index.html file.

* Created the following API routes should be created:

- GET /api/notes that reads the db.json file and returns all saved notes as JSON.

- POST /api/notes that receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client. Used a UUID4 module for creation of an ids.

- Created a route to DELETE a requets.


