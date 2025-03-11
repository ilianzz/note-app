import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

// Habilitar la sandbox
app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Cargar el archivo HTML de la aplicación React
  win.loadURL('http://localhost:3000');
});

// Manejador de cierre de la aplicación
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});