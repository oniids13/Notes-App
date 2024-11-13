import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);


  const getData = async () =>{
    const response = await Axios.get("http://localhost:3000/getData");
    setNotes(response.data);
  }

  async function addNote(newNote) {
    const {title, content} = newNote
    try {
      const response = await Axios.post("http://localhost:3000/add", {title, content});
      setNotes(prev => [...prev, response.data]);
      console.log("Notes added", response.data)
    } catch (err) {
      console.log('Error adding notes', err);
    }
  }

  async function deleteNote(id) {
    const noteId = id
    try {
      const response = await Axios.post("http://localhost:3000/delete", {"id": noteId});
      console.log("Note Deleted", response.data)
      setNotes(prev => {
        const updatedNotes = prev.filter((note) => note.id !== id);
        return updatedNotes
      });
    } catch (err) {
      console.log("Error deleting", err)
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
