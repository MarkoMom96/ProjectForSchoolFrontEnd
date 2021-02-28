import React from "react";
import { Container } from "react-bootstrap";
import "./banner.css" ;

export class Banner extends React.Component{
    render(){
        return(
            <Container fluid className = "borderB">
                 <h1>Aplikacija za testiranje studenta</h1>
            </Container>
               
            
            
        )
    }
}