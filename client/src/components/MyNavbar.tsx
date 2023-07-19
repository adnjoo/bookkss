'use client';

import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react';

export function MyNavbar() {
  const { data: session } = useSession({
    required: false,
  });

  console.log(session);

  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary
    '
    >
      <Container>
        <Navbar.Brand href='/'>bookkss</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='flex w-full justify-between'>
            <div className='flex'>
              <Nav.Link href='/'>Home</Nav.Link>
              {session && <Nav.Link href='/dashboard'>Dashboard</Nav.Link>}
            </div>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <Nav.Link href='/login'>Login</Nav.Link>
              <Nav.Link onClick={() => signOut()}>Sign out</Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
