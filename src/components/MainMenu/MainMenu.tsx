import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { user } from '../..';
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
    <Container  className="borderL borderR p-0">
      <Navbar  expand="md" className = "p-0">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant = "tabs">
            {
              this.props.items.map(this.addNavLink)
            }
            <Nav.Link href="#">Odjava</Nav.Link>
          </Nav>        
        </Navbar.Collapse>
        <Navbar.Text className = "ml-auto pr-2" >Korisnik: { user }</Navbar.Text>
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