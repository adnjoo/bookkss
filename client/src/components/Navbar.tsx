import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';

import { logOut } from '../lib/helpers';
import { SERVER_URL } from '../lib/helpers';
import { useUserStore } from '../zustand/store';
import { Link } from 'react-router-dom';

const nonAuthPages = ['Discover', 'Blog'];
const authPages = ['Dashboard', 'Archive', 'Discover'];

export function Navbar() {
  const user = useUserStore((state: any) => state.user);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const setUser = useUserStore((state: any) => state.setUser);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${SERVER_URL}/users/is-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static' color='primary'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            component='a'
            href='/'
            variant='h4'
            sx={{
              mr: 2,
              color: 'black',
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
            bookkss
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {(user ? authPages : nonAuthPages).map((page) => (
                <Link
                  to={`/${page.toLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ display: 'flex', flexDirection: 'col' }}
                  >
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            id='mobile logo'
            variant='h3'
            noWrap
            component='a'
            href='/'
            sx={{
              color: 'black',
              fontWeight: 800,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            B
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            id='desktop-menu'
          >
            {(user ? authPages : nonAuthPages).map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  noWrap
                  sx={{ color: 'black', fontWeight: 800, mr: 2 }}
                >
                  {page}
                </Typography>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} id='right'>
            <Tooltip title={user ? 'Logout' : 'Login'} arrow={true}>
              <IconButton
                onClick={() => {
                  user ? logOut() : (window.location.href = '/login');
                }}
              >
                <LoginIcon sx={{ color: 'black' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
