import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <>
      <AddNote/>
      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;