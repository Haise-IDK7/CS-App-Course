// Estado del estudiante, guardado en este equipo (localStorage).
const KEY = 'guiacs:v1';
const blank = () => ({
  status: {},   // id de curso -> 'doing' | 'done'
  dates: {},    // id de curso -> fecha de finalización (AAAA-MM-DD)
  notes: {},    // id de curso -> apuntes
  plan: { start: null, hours: 20, tracks: [], finals: [], pick: {} },
  theme: null
});

function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); return { ...blank(), ...s, plan: { ...blank().plan, ...(s.plan || {}) } }; }
  catch { return blank(); }
}

export const state = load();
const subs = new Set();
export const onChange = (fn) => { subs.add(fn); return () => subs.delete(fn); };
export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* almacenamiento no disponible */ }
  subs.forEach((fn) => fn(state));
}

export const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

// pendiente -> en curso -> completado -> pendiente
export function cycle(id) {
  const cur = state.status[id];
  if (!cur) state.status[id] = 'doing';
  else if (cur === 'doing') { state.status[id] = 'done'; state.dates[id] = state.dates[id] || today(); }
  else { delete state.status[id]; delete state.dates[id]; }
  save();
}
export function setStatus(id, v) {
  if (v) state.status[id] = v; else delete state.status[id];
  if (v === 'done') state.dates[id] = state.dates[id] || today(); else delete state.dates[id];
  save();
}

export const exportData = () => JSON.stringify(state, null, 2);
export function importData(text) {
  const data = JSON.parse(text);
  if (!data || typeof data !== 'object' || !('status' in data)) throw new Error('El archivo no es una copia de progreso de esta app.');
  Object.assign(state, blank(), data, { plan: { ...blank().plan, ...(data.plan || {}) } });
  save();
}
export function resetAll() { const theme = state.theme; Object.assign(state, blank(), { theme }); save(); }
