const express = require('express');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');

// Route 1: Get all the notes using: GET "/api/notes/fetallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
})
// Route 2: add a new note using: GET "/api/notes/addnote"

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 2 }),], async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            //if there are errors return bad request and the errors
            const result = await validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ result: result.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()

            res.json(saveNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal error occured");
        }
    })

// Route 3: update and existing note: GET "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be update and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404), send("Not Found")
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured");
    }
})

// Route 4: delete note: GET "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and deleted 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findOneAndDelete(req.params.id);
        res.json({ "succes": "note has ben deleted" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured");
    }
})


module.exports = router