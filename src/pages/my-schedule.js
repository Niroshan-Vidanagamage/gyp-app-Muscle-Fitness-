import { useEffect, useState } from 'react'
import { getSchedule, addItem, updateItem, removeItem } from '../utils/storage'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table, TableBody, TableCell, TableHead, TableRow,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

/** Master list used for dropdowns in the form */
const EXERCISES = [
  { id:'bench-press', name:'Bench Press', sets: '4-5', reps: '8-10', restTime: '3-5 min' },
  { id:'squat',       name:'Back Squat',  sets: '4-5', reps: '8-10', restTime: '3-5 min' },
  { id:'plank',       name:'Plank',       sets: '4-5', reps: '8-10', restTime: '3-5 min' }
]
const SET_OPTIONS  = ['1', '2', '3', '4', '5']
const REPS_OPTIONS = ['2', '3', '4', '5', '6', '8', '10', '12', '15', '20']

export default function SchedulePage() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [openRowId, setOpenRowId] = useState(null)

  // draft state (create/edit)
  const [draft, setDraft] = useState({ id: null, title: '', exercises: [] })
  const [selExercise, setSelExercise] = useState(EXERCISES[0].id)
  const [selSets, setSelSets] = useState(SET_OPTIONS[3])   // '4'
  const [selReps, setSelReps] = useState(REPS_OPTIONS[6])  // '10'

  useEffect(() => { setItems(getSchedule()) }, [])

  function startNew() {
    setDraft({ id: null, title: '', exercises: [] })
    setSelExercise(EXERCISES[0].id)
    setSelSets(SET_OPTIONS[2])
    setSelReps(REPS_OPTIONS[3])
    setShowForm(true)
    setOpenRowId(null)
  }

  function addExerciseToDraft() {
    const found = EXERCISES.find(e => e.id === selExercise)
    if (!found) return
    const line = {
      exerciseId: found.id,
      name: found.name,
      sets: selSets,
      reps: selReps,
      restTime: found.restTime
    }
    setDraft(d => ({ ...d, exercises: [...d.exercises, line] }))
  }

  function removeExerciseFromDraft(index) {
    setDraft(d => ({ ...d, exercises: d.exercises.filter((_, i) => i !== index) }))
  }

  function saveDraft() {
    if (!draft.title.trim()) { alert('Please enter a schedule title'); return }
    if (draft.exercises.length === 0) { alert('Add at least one exercise'); return }

    if (draft.id) {
      updateItem(draft.id, { title: draft.title, exercises: draft.exercises })
      setItems(prev => prev.map(x => x.id === draft.id ? { ...x, ...draft } : x))
    } else {
      const saved = addItem({ title: draft.title, exercises: draft.exercises })
      setItems(prev => [...prev, saved])
    }
    setShowForm(false)
    setDraft({ id: null, title: '', exercises: [] })
  }

  function editSchedule(row) {
    setDraft({ id: row.id, title: row.title, exercises: row.exercises || [] })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteSchedule(id) {
    if (!window.confirm('Delete this schedule?')) return
    removeItem(id)
    setItems(prev => prev.filter(x => x.id !== id))
    if (openRowId === id) setOpenRowId(null)
  }

  // Show all schedules (no date filter). Optional: newest first if you later add createdAt.
  const allItems = items

  return (
    <Box sx={{ bgcolor: 'common.black', color: 'common.white', py: 4, minHeight: '100vh' }}>
      <Container id="schedule" maxWidth={false}>
        <Box
          sx={{
            p: 4,
            mb: 3,
            minHeight: '500px',
            maxWidth: '100%',
            borderRadius: '12px',
            backgroundImage: `url(${process.env.PUBLIC_URL}/background2.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundColor: 'rgba(0,0,0,.5)',
            backgroundBlendMode: 'multiply',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            My Schedule
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom sx={{  color: 'grey.400', textAlign: 'center' }}>
            Create and manage your personalized workout schedules to stay organized and motivated. click Add a schedule.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <Button variant="contained" color="error" onClick={startNew}>
              Add a Schedule
            </Button>
          </Box>
        </Box>

        {/* Accordion: Add/Edit */}
        {showForm && (
          <Box sx={{ width: '50%', mx: 'auto', bgcolor: 'grey.900', p: 3, borderRadius: '12px', mb: 4 }}>
            <TextField
              fullWidth
              label="Schedule Title"
              value={draft.title}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="e.g., Push Day"
              variant="outlined"
              sx={{ mb: 2, input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.700' }, '&:hover fieldset': { borderColor: 'white' } }, '& .MuiInputLabel-root': { color: 'grey.400' } }}
            />

            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{color: 'grey.400'}}>Exercise</InputLabel>
                  <Select value={selExercise} label="Exercise" onChange={e => setSelExercise(e.target.value)} sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.700' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                    {EXERCISES.map(e => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormControl fullWidth>
                  <InputLabel sx={{color: 'grey.400'}}>Sets</InputLabel>
                  <Select value={selSets} label="Sets" onChange={e => setSelSets(e.target.value)} sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.700' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                    {SET_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormControl fullWidth>
                  <InputLabel sx={{color: 'grey.400'}}>Reps</InputLabel>
                  <Select value={selReps} label="Reps" onChange={e => setSelReps(e.target.value)} sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.700' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                    {REPS_OPTIONS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="outlined" color="error" onClick={addExerciseToDraft} sx={{ height: '56px' }}>
                  Add to schedule
                </Button>
              </Grid>
            </Grid>

            {draft.exercises.length > 0 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Exercise</TableCell>
                    <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Sets</TableCell>
                    <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Reps</TableCell>
                    <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Rest</TableCell>
                    <TableCell sx={{ borderBottomColor: 'grey.800' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {draft.exercises.map((ln, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ color: 'white', border: 'none' }}>{ln.name}</TableCell>
                      <TableCell sx={{ color: 'white', border: 'none' }}>{ln.sets}</TableCell>
                      <TableCell sx={{ color: 'white', border: 'none' }}>{ln.reps}</TableCell>
                      <TableCell sx={{ color: 'white', border: 'none' }}>{ln.restTime}</TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <IconButton size="small" onClick={() => removeExerciseFromDraft(i)}><DeleteIcon sx={{ color: 'grey.500' }} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="error" size="large" onClick={saveDraft}>Save Schedule</Button>
            </Box>
          </Box>
        )}

        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 4, p: 4 }}>All Schedules</Typography>
        {allItems.length === 0 ? (
          <Typography sx={{ color: 'grey.500' }}>No schedules saved yet.</Typography>
        ) : (
          <Box sx={{ width: '75%',mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {allItems.map(row => (
              <Accordion
                key={row.id}
                expanded={openRowId === row.id}
                onChange={() => setOpenRowId(id => id === row.id ? null : row.id)}
                sx={{ bgcolor: 'grey.900', color: 'white', borderRadius: '12px', '&:before': { display: 'none' }, '&.Mui-expanded': { my: 1 } }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  aria-controls={`sched-content-${row.id}`}
                  id={`sched-header-${row.id}`}
                >
                  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">{row.title}</Typography>
                  </Box>
                  <Box sx={{ flexShrink: 0, mr: -1 }}>
                    <IconButton title="Edit" onClick={(e) => { e.stopPropagation(); editSchedule(row); }}><EditIcon sx={{ color: 'grey.400' }} /></IconButton>
                    <IconButton title="Delete" onClick={(e) => { e.stopPropagation(); deleteSchedule(row.id); }}><DeleteIcon sx={{ color: 'grey.400' }} /></IconButton>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Exercise</TableCell>
                        <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Sets</TableCell>
                        <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Reps</TableCell>
                        <TableCell sx={{ color: 'grey.400', borderBottomColor: 'grey.800' }}>Rest</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(row.exercises || []).map((ln, i) => (
                        <TableRow key={i}>
                          <TableCell sx={{ color: 'white', border: 'none' }}>{ln.name ?? ln.exerciseId}</TableCell>
                          <TableCell sx={{ color: 'white', border: 'none' }}>{ln.sets}</TableCell>
                          <TableCell sx={{ color: 'white', border: 'none' }}>{ln.reps}</TableCell>
                          <TableCell sx={{ color: 'white', border: 'none' }}>{ln.restTime ?? '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  )
}
