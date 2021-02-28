import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './MainMenu.css';


export class MainMenu extends React.Component {
  render() {
  return (
    <Container  className="borderL borderR noPadding">
      <Navbar  expand="lg" className = "noPadding">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant = "tabs">
            <Nav.Link href="#home">Moji Testovi</Nav.Link>
            <Nav.Link href="#link">Odradjeni testovi</Nav.Link>
            <Nav.Link href="#link2">Registracija studenta</Nav.Link>
          </Nav>
          <Navbar.Text>Ime i Prezime, Indeks:123123123</Navbar.Text>
          <Nav>
          <Nav.Link className = "" href="#link3">Odjava</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
  }

  
}
export default MainMenu;