// Proceso principal de la app de escritorio. Sirve la carpeta dist/ con un protocolo propio (app://curso/),
// de modo que el origen es estable y el progreso guardado no se pierde entre ejecuciones.
const { app, BrowserWindow, protocol, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.md': 'text/markdown; charset=utf-8', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8'
};

const DIST = path.join(__dirname, '..', 'dist');
const ORIGIN = 'app://curso';

// Perfil propio y estable: con un nombre con tilde Electron puede resolver userData a la raíz de appData.
app.setName('Guia CS');
app.setPath('userData', path.join(app.getPath('appData'), 'GuiaCS'));

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true, allowServiceWorkers: true } }
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1360, height: 900, minWidth: 720, minHeight: 520,
    backgroundColor: '#f3f5f8',
    title: 'Guía CS',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });

  // Enlaces externos: en el navegador del sistema. Lo demás, dentro de la app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(ORIGIN)) return { action: 'allow', overrideBrowserWindowOptions: { width: 1000, height: 860, autoHideMenuBar: true } };
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith(ORIGIN)) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });

  win.loadURL(`${ORIGIN}/index.html`);

  // Modo de comprobación para CI: carga la app, cuenta los módulos y sale.
  if (process.env.MLC_SMOKE) {
    win.webContents.once('did-finish-load', async () => {
      const n = await win.webContents.executeJavaScript("new Promise(r => setTimeout(() => r(document.querySelectorAll('.route li').length), 1500))");
      console.log(`SMOKE etapas=${n}`);
      app.exit(n > 0 ? 0 : 1);
    });
  }
}

app.whenReady().then(() => {
  protocol.handle('app', async (request) => {
    const { pathname } = new URL(request.url);
    const file = path.normalize(path.join(DIST, decodeURIComponent(pathname === '/' ? '/index.html' : pathname)));
    if (!file.startsWith(DIST)) return new Response('Ruta no permitida', { status: 403 });
    try {
      const body = await fs.readFile(file);
      return new Response(body, { status: 200, headers: { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' } });
    } catch {
      return new Response('No encontrado', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
  });

  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
