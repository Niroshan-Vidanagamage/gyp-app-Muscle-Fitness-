import { useMemo, useState } from 'react'
import './equipment-page.css'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const EQUIPMENT = [
  
  {
    id: 'dumbbell',
    name: 'Dumbbell',
    category: 'strength',
    muscles: ['full body'],
    description: 'Unilateral strength and balance',
    image: '/background3.jpg'
    
  },
  {
    id: 'treadmill',
    name: 'Treadmill',
    category: 'cardio',
    muscles: ['legs', 'heart'],
    description: 'Steady-state or intervals',
    image: '/treadmill.webp'
    
  },
  {
    id: 'barbell',
    name: 'Barbell',
    category: 'strength',
    muscles: ['full body'],
    description: 'Versatile for compound lifts',
    image: '/barbell.jpg'   // put file in public/equipment/
    
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'strength',
    muscles: ['Chest', 'Shoulders','Triceps'],
    description: 'Versatile for compound lifts. Strenght and hypertropy training',
    image: '/bench_press.webp'   // put file in public/equipment/
    
  },
  {
    id: 'cable-crossover',
    name: 'Cable Crossover machine',
    category: 'Hypertropy',
    muscles: ['full body'],
    description: 'Good for isolation exercises with high reps',
    image: '/cable_crossover.jpg'   // put file in public/equipment/
    
  },
  {
    id: 'calf-machine',
    name: 'Calf machine',
    category: 'Hypertropy',
    muscles: ['Calves'],
    description: 'Isolation Excercise for Calves',
    image: '/calf_machine.jpg'   // put file in public/equipment/
    
  },
  {
    id: 'lat-pulldown',
    name: 'Lat pulldown machine',
    category: 'strength and Hypertropy',
    muscles: ['Back'],
    description: 'Target Lats. different grips can be used to target parts of back',
    image: '/lat_pulldown.jpg'   // put file in public/equipment/
    
  }
]

export default function EquipmentPage() {
  const [q,setQ] = useState('')
  const list = useMemo(() => EQUIPMENT.filter(e => e.name.toLowerCase().includes(q.toLowerCase())), [q])
  return (
    
    <Box id = 'equipment' sx={{ bgcolor: 'common.black', color: 'common.white', py: 4, minHeight: '100vh' }}>
      <Container id="equipment" maxWidth={false}>
        <Box
          className="equip-hero"
          sx={{
            position: 'relative',
            color: 'white',
            borderRadius: '12px',
            p: { xs: 2, sm: 4 },
            overflow: 'hidden',
            textAlign: 'center',
            aspectRatio: { xs: '3/1', sm: '5/1' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${process.env.PUBLIC_URL}/barbell.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
            backgroundBlendMode: 'multiply',
          }}
        >
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Gym Equipment
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px' }}>
            To do exercises we need many types of equipment. So to target different muscles and cardio there are specific machines.
          </Typography>
        </Box>

        {/* Search aligned to right */}
        <Box
          className="search-row"
          sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', my: 3 }}
        >
          <TextField
            placeholder="Search equipment"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            variant="outlined"
            sx={{
              minWidth: '280px',
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'grey.700' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'grey.500' },
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

        {/* Grid list with cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {list.map((e) => (
            <Card key={e.id} sx={{ bgcolor: 'grey.900', color: 'white', p: 2 ,}}>
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                {/* Column 1: Text Content */}
                <Grid item xs={12} md={8} lg={6} sx={{ width: '350px' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {e.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.400', mb: 1 }}>
                      Category: {e.category}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {e.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                      Target muscles: {new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(e.muscles)}.
                    </Typography>
                  </CardContent>
                </Grid>
                {/* Column 2: Image */}
                <Grid item xs={12} md={4} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CardMedia
                    component="img"
                    image={e.image}
                    alt={e.name}
                    sx={{
                      width: '100%',
                      maxWidth: '350px',
                      height: 'auto',
                      maxHeight: '350px',
                      borderRadius: '8px',
                      objectFit: 'contain',
                    }} />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}