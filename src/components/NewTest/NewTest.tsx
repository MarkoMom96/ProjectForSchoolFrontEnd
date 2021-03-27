import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../../api/api";
import SpecificMainMenu from "../SpecificMainMenu/SpecificMainMenu";


interface NewTestState {
  testName: string
  duration: number
  maxScore: number
  message: string
  
}

export class NewTest extends React.Component {
  state: NewTestState;
  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.state = {
      testName: "",
      duration: 30,
      maxScore: 30,
      message: "",
      
    }
  }



  private createTest() {
    const data = {
      testName:this.state.testName,
      duration: this.state.duration,
      maxScore: this.state.maxScore
    }
    console.log(data);
    api("api/test", "post", data, "profesor")
    .then((res)=>{
      if(res.status === "error") {
        this.setMessage("Doslo je do greske!")
        return;
      }
      if(res.status === "login") {
        this.setMessage("login")
        return;
      }
      this.setMessage("Test uspesno kreiran!")
      
    })
  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  render() {
    if(this.state.message === "login") {
      return <Redirect to = "#"></Redirect>
    }
    return (
      <Container className="px-0">
        <SpecificMainMenu case= {"profesor"} />
        <p className = "text-center lead" >Dodavanje testa</p>
        <Col md = {{span: 8, offset: 2}}>
          <Form>
            <Form.Group >
              <Form.Label>Naziv testa</Form.Label>
              <Form.Control 
                id = "testName"
                type="username"
                value = {this.state.testName}
                onChange = {event=>{this.formInputChangeHandler(event as any)}} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vreme trajanja</Form.Label>
              <Form.Control
                id = "duration" 
                type = "number"
                min = "1"
                step = "1"
                value = {this.state.duration}
                onChange = {event=>{this.formInputChangeHandler(event as any)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Maksimalni broj poena</Form.Label>
              <Form.Control
                id = "maxScore" 
                type = "number"
                min = "1"
                step = "1"
                value = {this.state.maxScore}
                onChange = {event=>{this.formInputChangeHandler(event as any)}}/>
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit"
              onClick = {()=> this.createTest()}  >
              Sacuvaj
            </Button>
            {this.state.message === "Doslo je do greske!"? <Alert variant = "danger">{this.state.message}</Alert>: null}
          </Form>
        </Col>
      </Container>


    )
  }
  formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = Object.assign(this.state, { 
      [event.target.id ]: event.target.value
    })
    this.setState(newState);
    console.log(newState);
  }
}

export default NewTest