'use client';

import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';

export function MyNavbar() {
  const { data: session } = useSession();

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
              {1 && <Nav.Link href='/dashboard'>Dashboard</Nav.Link>}
            </div>
            <NavDropdown
              align='end'
              title={
                <div className='flex flex-row'>
                  {session ? (
                    <img
                      src={session?.user?.image as string}
                      className='rounded-full'
                      width={20}
                    />
                  ) : (
                    <CgProfile size={20} />
                  )}
                </div>
              }
              id='basic-nav-dropdown'
            >
              {!session && <Nav.Link href='/signin'>Sign In</Nav.Link>}
              {session && (
                <Nav.Link onClick={() => signOut()}>Sign out</Nav.Link>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
