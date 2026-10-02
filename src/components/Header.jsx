import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          Câmbio de Moedas
        </Navbar.Brand>
        <Navbar.Text className="d-none d-md-block text-white-50">
          Projeto 1 - Programação Web Fullstack (SPA em React)
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
