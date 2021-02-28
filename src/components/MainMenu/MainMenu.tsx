import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './MainMenu.css';

export class MainMenuItem{
    linkName: string = "";
    linkHref: string = "#";

    constructor(linkName: string, linkHref: string) {
      this.linkName = linkName;
      this.linkHref = linkHref;
    }

}

interface MainMenuProperties {
    items: MainMenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
  render() {
  return (
    <Container  className="borderL borderR noPadding">
      <Navbar  expand="lg" className = "noPadding">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant = "tabs">
            {
              this.props.items.map(this.addNavLink)
            }
          </Nav>
          <Navbar.Text>Ime i Prezime, Indeks:123123123</Navbar.Text>
          <Nav>
          <Nav.Link href="#">Odjava</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
  }
  private addNavLink(item: MainMenuItem) {
    return(
      <Nav.Link href = { item.linkHref }> {item.linkName} </Nav.Link>
    )
  }
  
}
export default MainMenu;