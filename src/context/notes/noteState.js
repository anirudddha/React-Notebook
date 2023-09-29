import NoteContext from "./noteContext";
import React,{ useState }  from "react";

const NoteState = (props)=>{
    const initialState = [
        {
          "_id": "6506b2b50addf095d503d64d",
          "user": "65007907d61d48c80768c917",
          "title": "title is title",
          "description": "des is dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:01.189Z",
          "__v": 0
        },
        {
          "_id": "6506b2bf0addf095d503d64f",
          "user": "65007907d61d48c80768c917",
          "title": "sjhhs",
          "description": "des dfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:11.706Z",
          "__v": 0
        },
        {
          "_id": "6506b2cf0addf095d503d651d",
          "user": "65007907d61d48c80768c917",
          "title": "ffffsf",
          "description": "dfdfes dfsdfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:27.835Z",
          "__v": 0
        },
        {
          "_id": "6506b2d60addf095d503d655s",
          "user": "65007907d61d48c80768c917",
          "title": "ffffsfff",
          "description": "dfdffffes dfsdfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:34.522Z",
          "__v": 0
        },
        {
          "_id": "6506b2cf0addf095d503d657k",
          "user": "65007907d61d48c80768c9111",
          "title": "ffffsf",
          "description": "dfdfes dfsdfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:27.835Z",
          "__v": 0
        },
        {
          "_id": "6506b2d60addf095d503d656b",
          "user": "65007907d61d48c80768c9156",
          "title": "ffffsfff",
          "description": "dfdffffes dfsdfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:34.522Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(initialState);

      // Add Note
      const addNote =(title,description,tag)=>{
        // todo api call
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
      const deleteNote =(id)=>{
        console.log("deleted  "+id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }

      // Edit a Note
      const editNote =(id,title,description,tag)=>{

      }
      return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
      )
}

export default NoteState;