import { useState } from 'react'

export default function ScheduleForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    date: new Date().toISOString().slice(0,10),
    title: '',
    exercises: [],
    notes: ''
  })

  const [exerciseText, setExerciseText] = useState('')

  function addExercise(e) {
    e.preventDefault()
    if (!exerciseText.trim()) return
    setForm(f => ({
      ...f,
      exercises: [...f.exercises, { exerciseId: exerciseText.trim(), sets: 3, reps: 10 }]
    }))
    setExerciseText('')
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) return alert('Please add a session title')
    onSave?.(form)
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Date<input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} /></label>
      <label>Session Title<input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Push Day"/></label>
      <div className="row">
        <input value={exerciseText} onChange={e=>setExerciseText(e.target.value)} placeholder="Add exercise id (e.g. bench-press)"/>
        <button onClick={addExercise}>Add</button>
      </div>
      <ul className="list">
        {form.exercises.map((x,i)=> (
          <li key={i}>{x.exerciseId} – {x.sets}x{x.reps}</li>
        ))}
      </ul>
      <label>Notes<textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} /></label>
      <div className="row end">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}