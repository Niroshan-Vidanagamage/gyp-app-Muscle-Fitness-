import { Box, Container, Grid, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 2,
        mt: 'auto',
        backgroundColor: 'grey.900',
        color: 'white',
        borderTop: '1px solid',
        borderColor: 'grey.800',
      }}
    >
      <Container width ="100%" maxWidth="lg">
        <Grid container spacing={5}>
          {/* Column 1 */}
          <Grid size = {{xs:12, sm:4, md:4}} >
            <Typography variant="h6" gutterBottom>About</Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Home</Link>
              <Link component={RouterLink} to="/schedule" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>My Schedule</Link>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid size = {{xs:12, sm:4, md:4}} >
            <Typography variant="h6" gutterBottom>Explore</Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/exercises" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Exercises</Link>
              <Link component={RouterLink} to="/equipment#equipment" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Equipment</Link>
            </Box>
          </Grid>

          {/* Column 3 */}
          <Grid size = {{xs:12, sm:4, md:4}} >
            <Typography variant="h6" gutterBottom>Connect</Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/about#contact" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Contact Us</Link>
              <Link component={RouterLink} to="/about#reviews" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>What others think</Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: 'grey.800', textAlign: 'center' }}>
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Muscle Fitness. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}