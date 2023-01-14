const express = require("express");
const NoteModel = require("../models/node.model");

const app = express.Router();

app.get("/",async (req, res) => {
  
  try{
   
    let notes = await NoteModel.find();
    res.send(notes);
}
catch(err){
    console.log(err);
    res.send(err.message);
}
});

app.post("/create", async (req, res) => {
  // verify token
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send("created the note");
  } catch (e) {
    console.log(e);
    res.send("error creating");
  }
  
});

app.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.findOne({"_id":id});
  console.log(note);
  const userID_in_note =note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorized " });
    } else {
      await NoteModel.findByIdAndUpdate({"_id":id}, payload);
      res.send("update data");
    }
  } catch (err) {
    console.log(err);
    res.send({"msg":"something went wrong "});
  }
});

app.delete("/delete/:id", async(req, res) => {

  const id = req.params.id;
  const note = await NoteModel.findOne({"_id":id});
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorized " });
    } else {
      await NoteModel.findByIdAndDelete({"_id":id});
      res.send("Delete the note");
    }
  } catch (err) {
    console.log(err);
    res.send({"msg":"something went wrong "});
  }
});

module.exports = app;
