import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Stack } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = () => (
  <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
    <Link to="/">
      <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 20px' }} />
    </Link>
    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
    >
      {/* Use NavLink for active link styling */}
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: '#3A1212',
          borderBottom: isActive ? '3px solid #FF2625' : 'none', // Apply red underline if active
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/exercises"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: '#3A1212',
          borderBottom: isActive ? '3px solid #FF2625' : 'none', // Apply red underline if active
        })}
      >
        Exercises
      </NavLink>
    </Stack>
  </Stack>
);

export default Navbar;
