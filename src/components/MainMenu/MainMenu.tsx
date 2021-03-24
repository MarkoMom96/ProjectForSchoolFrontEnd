import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import { getUserInfo } from '../../api/api';


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
interface MainMenuState {
  items: MainMenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
  
  state:MainMenuState;

  constructor(props: Readonly<MainMenuProperties>){
    super(props);

    this.state = {
        items: props.items
    }
  }

  setItems(items:MainMenuItem[]){
    this.setState( {
      items:items
    }); 

  }
  


  render() {
    const info = getUserInfo();
  return (  
    <Container className = "borderLR px-0">
      <Navbar expand="md" className = "p-0">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant = "tabs">
            <HashRouter>          
              { this.state.items.map(this.addNavLink) }           
            </HashRouter>
            <Nav.Link href="/">Odjava</Nav.Link> 
          </Nav>        
        </Navbar.Collapse>
        <Navbar.Text className = "ml-auto pr-2" >Korisnik: { `${info.forename} ${info.surname}` }</Navbar.Text>
      </Navbar>
    </Container>
  );
  }
  private addNavLink(item: MainMenuItem) {
    return(
      <Link key = {item.linkName} to = { item.linkHref } className = "nav-link">
        {item.linkName}
      </Link>
      
    )
  }
  
}
export default MainMenu;