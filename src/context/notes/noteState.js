import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialState = [
    
  ]
  const [notes, setNotes] = useState(initialState);

  // get all notes
  const getNotes = async() => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMDc5MDdkNjFkNDhjODA3NjhjOTE3In0sImlhdCI6MTY5NDUyOTc5OX0.nv7DVnZd--iExayrLrrIpT6Cs6E37N3ULbT0Bpkr2_8"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  

  // Add Note
  const addNote = async(title, description, tag,id) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMDc5MDdkNjFkNDhjODA3NjhjOTE3In0sImlhdCI6MTY5NDUyOTc5OX0.nv7DVnZd--iExayrLrrIpT6Cs6E37N3ULbT0Bpkr2_8"
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    response.json();
    // console.log(json);

    const note = {
      "_id": "6506b2d64addf045d503d656b",
      "user": "65007907d61d48c80768c9456",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-09-17T08:03:34.522Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async(id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMDc5MDdkNjFkNDhjODA3NjhjOTE3In0sImlhdCI6MTY5NDUyOTc5OX0.nv7DVnZd--iExayrLrrIpT6Cs6E37N3ULbT0Bpkr2_8"
      },
    });
    const json = response.json();
    console.log(json);
    console.log("deleted  " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMDc5MDdkNjFkNDhjODA3NjhjOTE3In0sImlhdCI6MTY5NDUyOTc5OX0.nv7DVnZd--iExayrLrrIpT6Cs6E37N3ULbT0Bpkr2_8"
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    response.json();
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;