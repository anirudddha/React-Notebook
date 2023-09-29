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
          "_id": "6506b2cf0addf095d503d651",
          "user": "65007907d61d48c80768c917",
          "title": "ffffsf",
          "description": "dfdfes dfsdfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:27.835Z",
          "__v": 0
        },
        {
          "_id": "6506b2d60addf095d503d655",
          "user": "65007907d61d48c80768c917",
          "title": "ffffsfff",
          "description": "dfdffffes dfsdfsf dis ids",
          "tag": "tag",
          "date": "2023-09-17T08:03:34.522Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(initialState);
      return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
      )
}

export default NoteState;