import React from "react";
import { Button, Container, TabContainer } from "react-bootstrap";

export class Header extends React.Component {

  render(){
    return(
      <div className="banner">
        
        <div className="row justify-content-between no-gutters">
          <p className="col-10 ">Ime i Prezime</p>
          <button className="btn btn-secondary btn-sm col-2">Odjava</button>
        </div>
        <div className="row no-gutters">
          <p className="col-10 ">Podaci</p>
          <button className="btn btn-primary col-2">Prijava studenta</button>
        </div>
      
      </div>

      


      

      

      
    )
  }
}