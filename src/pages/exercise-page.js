import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

// We can remove the dependency on the custom Section component
// and the separate CSS file by using MUI components and the sx prop.
const EXERCISES = [
  { 
    id:'bench-press', 
    name:'Bench Press', 
    equipment:'barbell', 
    primaryMuscle:'chest', 
    difficulty:'intermediate',
    technique: 'lie on the bench with your feet flat and drive your shoulders into the bench while keeping your back slightly arched and glutes on the bench. Grip the bar slightly wider than shoulder-width with thumbs wrapped around the bar, then unrack the weight and lower it to your lower chest while tucking your elbows to roughly a 45° angle. Drive the bar up and slightly back, pushing through your feet to extend your arms.',
    sets: '4-5',
    reps: '8-10',
    restTime: '3-5 min',
    image: '/bench_press1.jpeg',
    video: '/bench_press.mp4'
  },
  { 
    id:'squat', 
    name:'Back Squat', 
    equipment:'barbell', 
    primaryMuscle:'legs', 
    difficulty:'intermediate' ,
    technique: 'stand with your feet shoulder-width apart, chest proud, and core braced. Hinge your hips back and bend your knees as if sitting in a chair, keeping your back straight and knees tracking over your toes. Lower yourself until your thighs are parallel to the floor, then drive through your heels to stand back up, squeezing your glutes at the top.',
    sets: '4-5',
    reps: '8-10',
    restTime: '3-5 min',
    image: '/squat.jpg',
    video: '/squat.mp4'
  },
  { id:'plank', 
    name:'Plank', 
    equipment:null, 
    primaryMuscle:'abs', 
    difficulty:'beginner',
    technique: 'lie face down and place your elbows directly under your shoulders, supporting your body on your forearms and toes to form a straight line from your head to your heels. Keep your core and glutes engaged, drawing your belly button toward your spine, and maintain a neutral neck by looking at the floor. Hold this isometric position for as long as you can maintain proper form, avoiding any sagging of the hips or arching of the back.',
    sets: '4-5',
    reps: '8-10',
    restTime: '3-5 min',
    image: '/stay_fit4.jpg',
    video: '/plank.mp4'
  }
]

export default function ExercisePage() {
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState(null)

  const list = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return EXERCISES
    return EXERCISES.filter(x =>
      [x.name, x.equipment, x.primaryMuscle, x.difficulty]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(qq))
    )
  }, [q])

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id))

  return (
    <Box sx={{ bgcolor: 'common.black', color: 'common.white', py: 4, minHeight: '100vh' }}>
      <Container id="exercises" maxWidth={false}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Exercises
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center', color: 'grey.400', mb: 4 }}>
          Gym exercise content includes information on the various benefits of working out, such as improved
          physical health and enhanced mental well-being. It also involves understanding
          different types of exercises, how to structure a workout routine with proper form, progression, and rest days.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', my: 3 }}>
          <TextField
          placeholder="Search exercises"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          variant="outlined"
          sx={{
            minWidth: '280px',
            '& .MuiOutlinedInput-root': {
              color: 'white',
              borderRadius: '8px',
              '& fieldset': { borderColor: 'grey.700' },
              '&:hover fieldset': { borderColor: 'white' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            ),
          }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {list.map((x) => (
            <Card key={x.id} sx={{ bgcolor: 'grey.900', color: 'white', p: 2 }}>
              <Grid container spacing={3} alignItems="flex-start">
                {/* Column 1: Text Content & Video */}
                <Grid item xs={12} md={7} sx={{ width: '50%' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>{x.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'grey.400', mb: 2, textTransform: 'capitalize' }}>
                      {x.primaryMuscle} • {x.difficulty}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}><strong>Equipment:</strong> {x.equipment ?? 'Bodyweight'}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}><strong>Technique:</strong> {x.technique}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}><strong>Sets / Reps:</strong> {x.sets} × {x.reps}</Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}><strong>Rest:</strong> {x.restTime}</Typography>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => toggle(x.id)}
                      aria-expanded={openId === x.id}
                      aria-controls={`video-collapse-${x.id}`}
                    >
                      Video Demo
                    </Button>

                    <Collapse in={openId === x.id} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
                      <video
                        style={{ width: '100%', maxHeight: '500px', borderRadius: '8px', background: '#000' }}
                        src={x.video}
                        controls
                        preload="metadata"
                        poster={x.image}
                      />
                    </Collapse>
                  </CardContent>
                </Grid>

                {/* Column 2: Image (Right side) */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    image={x.image}
                    alt={x.name}
                    sx={{
                      width: '100%',
                      maxWidth: '400px',
                      height: 'auto',
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}