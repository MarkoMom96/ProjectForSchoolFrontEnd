import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../../api/api";
import SpecificMainMenu from "../SpecificMainMenu/SpecificMainMenu";

interface NewTestProps{
  match: {
    params: {
      id: number;
      
    }
  }
}
interface NewTestState {
  testName: string
  duration: number
  message: string
  
}

export class NewTest extends React.Component<NewTestProps> {
  state: NewTestState;
  constructor(props: NewTestProps) {
    super(props)

    this.state = {
      testName: "",
      duration: 30,
      message: "",
      
    }
  }



  private createTest() {
    const data = {
      testName:this.state.testName,
      duration: this.state.duration,
      professorId: this.props.match.params.id
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
        <SpecificMainMenu case= {"profesor"} id= {this.props.match.params.id} />
        <p className = "text-center lead" >Kreiranje testa</p>
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
                value = {this.state.duration}
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