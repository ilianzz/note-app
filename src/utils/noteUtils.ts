import fs from 'fs';
import path from 'path';

const NOTES_DIR = path.join(__dirname, 'notes');

// Crear el directorio de notas si no existe
if (!fs.existsSync(NOTES_DIR)) {
  fs.mkdirSync(NOTES_DIR);
}

// Guardar las notas en un archivo
export const saveNote = (notes: string[]) => {
  const filePath = path.join(NOTES_DIR, 'notes.json');
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};

// Cargar las notas desde un archivo
export const loadNotes = async (): Promise<string[]> => {
  const filePath = path.join(NOTES_DIR, 'notes.json');
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }
  return [];
};