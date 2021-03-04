import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
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

    /*setInterval(()=>{
        const NewItems = [...this.state.items];       
        NewItems.push(new MainMenuItem("NewLink", "#"));
        this.setItems(NewItems);       
    },2000);
    */


  }

  setItems(items:MainMenuItem[]){
    this.setState( {
      items:items
    }); 

  }
  


  render() {
  return (
    <Container  className="borderL borderR p-0">
      <Navbar  expand="md" className = "p-0">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant = "tabs">
            <HashRouter>          
              { this.state.items.map(this.addNavLink) }           
            </HashRouter>
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
      <Link to = { item.linkHref } className = "nav-link">
        {item.linkName}
      </Link>
      
    )
  }
  
}
export default MainMenu;