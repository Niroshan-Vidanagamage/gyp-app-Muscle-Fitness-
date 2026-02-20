import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'

// 6 random reviews with avatar images
const REVIEWS = [
  {
    id: 1,
    name: 'Alex P.',
    avatar: '/person1.jpg',
    text: 'Simple, fast, and exactly what I needed to stay on track each week.'
  },
  {
    id: 2,
    name: 'Priya S.',
    avatar: '/person2.jpg',
    text: 'Great for planning my weekly split. The schedule flow is super clear.'
  },
  {
    id: 3,
    name: 'Diego M.',
    avatar: '/person3.jpg',
    text: 'Filters and layout are clean. Adding sessions feels frictionless.'
  },
  {
    id: 4,
    name: 'Niro T.',
    avatar: '/person4.webp',
    text: 'Perfect for combining strength and cardio without overthinking.'
  },
  {
    id: 5,
    name: 'Sara K.',
    avatar: '/person5.jpg',
    text: 'I love the minimal design and that my plan persists between visits.'
  },
  {
    id: 6,
    name: 'Hassan R.',
    avatar: '/person6.jpeg',
    text: 'Exactly the tool I needed to focus on consistency and good form.'
  }
]

// Fisher–Yates shuffle once on mount
function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * A helper component from Material-UI docs to create tab panels.
 * It shows content only when the associated tab is active.
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`review-tabpanel-${index}`}
      aria-labelledby={`review-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [reviews] = useState(shuffle(REVIEWS))

  const tabA = reviews.slice(0, 4)
  const tabB = reviews.slice(4)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  }

  return (
    <Box sx={{ bgcolor: 'common.black', color: 'common.white', py: 4 }}>
      <Container maxWidth={false}>
        {/* About section */}
        <Box
          id="about"
          sx={{
            position: 'relative',
            color: 'white',
            borderRadius: '12px',
            p: { xs: 3, md: 6 },
            mb: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '400px',
            backgroundImage: 'url(/team2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 10%',
            backgroundColor: 'rgba(0,0,0,.5)',
            backgroundBlendMode: 'multiply',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            About Muscle Fitness
          </Typography>
          <Typography variant="h6" component="p" sx={{ maxWidth: '600px', color: 'grey.300' }}>
            We’re a small team focused on practical strength, smart conditioning,
            and long-term health—gym trainers, gym users, doctors, engineers, and
            many more behind the scenes.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography><strong>Vision:</strong> A fitter community, one simple plan at a time.</Typography>
            <Typography><strong>Mission:</strong> Provide a focused tool to plan workouts and learn safe movements.</Typography>
          </Box>
        </Box>

        {/* Reviews section */}
        <Box id="reviews" sx={{ my: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Reviews
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.800', display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="Reviews tabs"
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: 'error.main' },
                '& .MuiTab-root': { color: 'grey.500' },
                '& .Mui-selected': { color: 'white !important' },
              }}
            >
              <Tab label="Top Reviews" id="review-tab-0" aria-controls="review-tabpanel-0" />
              <Tab label="More Reviews" id="review-tab-1" aria-controls="review-tabpanel-1" />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              {tabA.map(r => <ReviewCard key={r.id} {...r} />)}
            </Grid>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={3}>
              {tabB.map(r => <ReviewCard key={r.id} {...r} />)}
            </Grid>
          </TabPanel>
        </Box>

        {/* Contact section */}
        <Box id="contact" sx={{ my: 6, width: '60%', mx: 'auto' }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Contact Us
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => { e.preventDefault(); alert('Thanks! This is a front-end only demo.') }}
          >
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid size ={{ xs:12 ,md:6} }>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField required fullWidth label="Name" variant="outlined" sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.700' }, '&:hover fieldset': { borderColor: 'white' } }, '& .MuiInputLabel-root': { color: 'grey.400' } }} />
                  <TextField required fullWidth label="Phone number" variant="outlined" sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.700' }, '&:hover fieldset': { borderColor: 'white' } }, '& .MuiInputLabel-root': { color: 'grey.400' } }} />
                  <TextField required fullWidth type="email" label="Email" variant="outlined" sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.700' }, '&:hover fieldset': { borderColor: 'white' } }, '& .MuiInputLabel-root': { color: 'grey.400' } }} />
                </Box>
              </Grid>
              {/* Right Column */}
              <Grid size ={{ xs:12 ,md:6} }>
                <TextField required multiline rows={8}  label="Message" variant="outlined" fullWidth sx={{ height: '100%', '& .MuiOutlinedInput-root': { height: '100%', color: 'white', '& fieldset': { borderColor: 'grey.700' }, '&:hover fieldset': { borderColor: 'white' } }, '& .MuiInputLabel-root': { color: 'grey.400' } }} />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="error" size="large">
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

function ReviewCard({ name, avatar, text }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ bgcolor: 'grey.900', color: 'white', height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Avatar src={avatar} alt={`${name} avatar`} sx={{ width: 56, height: 56, mb: 2 }} />
          <Typography variant="h6" component="strong" gutterBottom>{name}</Typography>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>{text}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
