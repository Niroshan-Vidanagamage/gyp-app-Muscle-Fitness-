const KEY = 'mf.schedule.v1'

export function getSchedule() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export function saveSchedule(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function addItem(item) {
  const items = getSchedule()
  const id = crypto.randomUUID()
  const saved = { id, ...item }
  items.push(saved)
  saveSchedule(items)
  return saved
}

export function updateItem(id, patch) {
  const items = getSchedule().map(x => x.id === id ? { ...x, ...patch } : x)
  saveSchedule(items)
}

export function removeItem(id) {
  const items = getSchedule().filter(x => x.id !== id)
  saveSchedule(items)
}