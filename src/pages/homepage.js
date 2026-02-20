import { useNavigate } from 'react-router-dom'
import './homepage.css'
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  Typography
} from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const values = [
  { title: 'Consistency', text: 'Small daily improvements beat occasional intensity.' },
  { title: 'Form First', text: 'Technique before load to stay injury-free.' },
  { title: 'Inclusivity', text: 'Programs for all levels.' }
]

const benefits = [
  'Personal schedule to track sessions',
  'Browse equipment and exercises',
  'Mobile-friendly, fast, and simple'
]
const SLOGANS = [
  {
    name: 'Arnold Schwarzenegger',
    slogan: 'The last three or four reps is what makes the muscle grow.',
    image: '/arnold.jpg'
  },
  {
    name: 'Ronnie Coleman',
    slogan: 'Yeah buddy, light weight baby!',
    image: '/Ronnie_Coleman.jpg'
  },
  {
    name: 'Dorian Yates',
    slogan: 'The only thing that\'s on my mind is that I\'ve got to be the best.',
    image: '/dorian_yates.jpeg'
  },
  {
    name: 'Jay Cutler',
    slogan: 'I don\'t eat for taste, I eat for function.',
    image: '/jay_cutler.jpg'
  }
];

export default function HomePage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: 'common.black', color: 'common.white', py: 4 }}>
      <Box
        className="company-info"
        sx={{
          py: 10,
          textAlign: 'center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${process.env.PUBLIC_URL}/background1.jpg)`,
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            ---Muscle Fitness----
          </Typography>
          <Typography variant="h5" component="p" sx={{ color: 'grey.400' }}>
            Muscle Fitness helps you plan and execute effective workouts with clarity and simplicity.
          </Typography>
        </Container>
      </Box>

      <Container id="content" maxWidth="lg" sx={{ mt: 4, border: '5px solid #000000', borderRadius: '12px', p: '1rem' }}>
        {/* Gym Values Section */}
        <Box id="gym-values" sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Gym Values
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {values.map((v) => (
              <Grid item key={v.title} xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'grey.900', color: 'white', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {v.title}
                    </Typography>
                    <Typography variant="body1">{v.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'black',
                '&:hover': { bgcolor: 'grey.300' },
              }}
              onClick={() => navigate('/exercises')}
            >
              Browse Exercises
            </Button>
          </Box>

          {/* Slogan Carousel Section */}
          <Box sx={{ mt: 6 }}>
            <Slider {...sliderSettings}>
              {SLOGANS.map((item) => (
                <Box key={item.name} sx={{ px: 1 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      color: 'white',
                      borderRadius: '12px',
                      p: { xs: 3, md: 4 },
                      minHeight: '400px',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                      backgroundColor: 'rgba(0,0,0,.6)',
                      backgroundBlendMode: 'multiply',
                    }}
                  >
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                      <Typography variant="h4" component="p" sx={{ fontStyle: 'italic', maxWidth: '80%' }}>
                        "{item.slogan}"
                      </Typography>
                      <Typography variant="h6" component="p" sx={{ mt: 2, fontWeight: 'bold' }}>
                        - {item.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>

        {/* Benefits Section */}
        <Box id="benefits" sx={{ my: 5 }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Benefits
          </Typography>
          <List>
            {benefits.map((b) => (
              <ListItem key={b}>
                <Typography variant="body1" component="span">
                  • {b}
                </Typography>
              </ListItem>
            ))}
          </List>
          

        <Grid container spacing={6} sx={{ mt: 2 }}>
            <Grid size = {{xs:12, md:6}}>
              <img src="/stay_fit.jpg" alt="Gym shot 1" style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} />
            </Grid>
            <Grid  size = {{xs:12, md:6}}>
              <img src="/stay_fit2.jpg" alt="Gym shot 2" style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} />
            </Grid>
            <Grid  size = {{xs:12, md:6}}>
              <img src="/stay_fit4.jpg" alt="Gym shot 3" style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} />
            </Grid>
            <Grid size = {{xs:12, md:6}}>
              <Box component="img" src="/back_2.jpg" alt="Gym shot 4" sx={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} />
            </Grid>
        </Grid>
        </Box>

        {/* Vision & Mission Section */}
        <Box id="vision-mission" sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Vision & Mission
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Vision:</strong> A fitter community, one simple plan at a time.
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Mission:</strong> Provide a focused tool to plan workouts and learn safe movements.
          </Typography>
        </Box>
      </Container>
    </Box>
    
  )
}