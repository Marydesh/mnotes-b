// cd mnotes-b/Develo
// node --watch server

const { readFileSync, writeFileSync } = require('fs')
const uuid = require('uuid')
const uuidv4 = uuid.v4

const express = require('express')

const app = express()
const PORT = 4321

const notesPath = __dirname + '/db/db.json'

function getNotes() {
    let notes = JSON.parse(readFileSync(notesPath, 'utf-8'))
    return notes
}

function generateId(numberOfChars, currentIds, attempts = 0) {
    let chars = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let id = ""
    for (let i = 0; 0 < numberOfChars; i++) {
        id += chars[Math.floor(Math.random()*chars.length)]
    }
    if (currentIds.includes(id)) {
        if (attempts > 100) {
            console.log("attempted 100 times!", id)
            return uuidv4()
        }
        return generateId(numberOfChars, currentIds, attempts+1)
    } else {
        return id
    }
}

app.use(express.static('public'))
app.use(express.json())

app.get('/api/notes', (req, res) => {
    res.json(getNotes())
})

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    let notes = getNotes()
    newNote.id = uuidv4()
    notes.push(newNote)
    writeFileSync(notesPath, JSON.stringify(notes))
    res.redirect('/notes')
})

/*
    JavaScript array methods
        pop, push, shift, unshift
        slice, splice, reverse
        forEach, map, filter, sort, find, reduce

    Express response methods that end the response
        res.send()
        res.sendFile()
        res.json()
        res.redirect()
*/

app.delete('/api/notes/:id', (req, res) => {
    let notes = getNotes()
    let i = notes.findIndex(n => n.id == req.params.id)
    if (i === -1) {

    } else {
        notes.splice(i, 1)
        writeFileSync(notesPath, JSON.stringify(notes))
    }
    res.redirect('/notes')
})

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, console.log(`Now listening on port ${PORT}. Click here: http://localhost:${PORT}/`))