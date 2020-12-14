import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from '../Login/login';
import { SideBar } from '../Sidebar/Sidebar';
import { Header } from '../Header/header';


function App() {
  return (
      <Container>
        <Header></Header>
        <div className="row no-gutters">

          <div className="col-sm-">
            <SideBar></SideBar>
          </div>

          <div className="col">
            
          </div>
        </div>
      </Container>
      
    
  );
}
export default App;
