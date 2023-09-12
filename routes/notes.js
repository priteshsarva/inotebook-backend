const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/NoteSchema')
const { body, validationResult } = require('express-validator');



// Router 1: Get All Notes using post:'/getallnotes"
router.post('/getallnotes', fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const allNotes = await Notes.find({ user: userid })
    res.json(allNotes)
  } catch (error) {
    // Checking if Any error occured from server side
    console.log(error);
    return res.status(400).send("internal Error Occured")
  }
})

// Router 2: Save Notes using post:'/Savenote"
router.post('/savenote', fetchuser, [
  body("title").isLength({ min: 3 }),
  body("description").isLength({ min: 3 })
], async (req, res) => {
  //Recived user data validation and sending bad request if validation has errors
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {

    // Save Notes to user
    const { title, description, tags } = req.body
    const userid = req.user.id;
    const note = await Notes.create({ user: userid, title, description, tags })
    note.save()
    res.json(note)
  } catch (error) {

    // Checking if Any error occured from server side
    console.log(error);
    return res.status(400).send(error)
  }
})


// Router 3: Update Notes using put:'/updatenote"
router.put('/updatenote/:id', fetchuser, [
], async (req, res) => {
  const { title, description, tags } = req.body

  const newNote = {}
  if (title) { newNote.title = title }
  if (description) { newNote.description = description }
  if (tags) { newNote.tags = tags }
  //Find note by Id
  try {
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Not found")
    }
    //Validating user for the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are Unauthorized")
    }
    //Upadting the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    return res.json({ note })
  } catch (error) {

  }
})

// Router 4: Delet Notes using delet:'/deletnote"
router.delete('/deletnote/:id', fetchuser, [
], async (req, res) => {
  //Find note by Id
  try {
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Not found")
    }
    //Validating user for the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are Unauthorized")
    }
    //Upadting the note
    note = await Notes.findByIdAndDelete(req.params.id)
    return res.json({ note })
  } catch (error) {

  }
})


module.exports = router