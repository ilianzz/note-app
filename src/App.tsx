import React, { useState, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { saveNote, loadNotes } from './utils/noteUtils'; // Asumiendo que tienes una función para guardar y cargar notas

// Definir el átomo de Jotai para manejar el estado de las notas
const notesAtom = atom<string[]>([]);

const App = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const [currentNote, setCurrentNote] = useState<string>('');

  useEffect(() => {
    // Cargar las notas al iniciar la aplicación
    loadNotes().then(setNotes);
  }, []);

  // Función para crear una nueva nota
  const createNote = () => {
    const newNote = currentNote.trim();
    if (newNote) {
      const newNotes = [...notes, newNote];
      setNotes(newNotes);
      saveNote(newNotes);  // Guardar notas automáticamente
      setCurrentNote('');
    }
  };

  // Función para eliminar una nota
  const deleteNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    saveNote(newNotes);  // Guardar el estado actualizado
  };
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (currentNote.trim()) {
        saveNote([...notes, currentNote]);  // Guardar automáticamente las notas
      }
    }, 3000); // Guardado cada 3 segundos
  
    return () => clearInterval(autoSaveInterval);
  }, [currentNote, notes]);

  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="flex flex-col">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Escribe tu nota aquí..."
          className="border p-2 mb-4 h-32"
        />
        <button
          onClick={createNote}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          Crear Nota
        </button>
        
        <div className="mt-4">
          {notes.length === 0 ? (
            <p>No tienes notas aún.</p>
          ) : (
            <ul className="space-y-2">
              {notes.map((note, index) => (
                <li key={index} className="bg-white p-2 border rounded">
                  <div className="flex justify-between items-center">
                    <span>{note}</span>
                    <button
                      onClick={() => deleteNote(index)}
                      className="text-red-500 ml-2"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;