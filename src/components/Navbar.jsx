import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const NAV_LINKS = [
  { title: 'Home', path: '/' },
  { title: 'Equipment', path: '/equipment' },
  { title: 'Exercises', path: '/exercises' },
  { title: 'My Schedule', path: '/schedule' },
  { title: 'About', path: '/about' },
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, bgcolor: 'grey.900', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {NAV_LINKS.map(({ title, path }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton component={NavLink} to={path}>
              <ListItemText primary={title} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'red' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo & Title */}
          <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black', flexGrow: { xs: 1, md: 0 } }}>
            <Box component="img" src="/compressed/logo1.avif" alt="Muscle Fitness logo" sx={{ height: 50, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Muscle Fitness
            </Typography>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 2 }}>
            {NAV_LINKS.map(({ title, path }) => (
              <Button
                key={title}
                component={NavLink}
                to={path}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  '&.active': {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  }
                }}
              >
                {title}
              </Button>
            ))}
          </Box>

          {/* Mobile Hamburger Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton size="large" aria-label="open navigation menu" onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}