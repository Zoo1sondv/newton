import Header from '@/components/_share/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

function Layout() {
  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
