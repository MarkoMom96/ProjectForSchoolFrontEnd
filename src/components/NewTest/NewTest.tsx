import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import api from "../../api/api";

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
  
}

export class NewTest extends React.Component<NewTestProps> {
  state: NewTestState;
  constructor(props: NewTestProps) {
    super(props)

    this.state = {
      testName: "",
      duration: 30,
      
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
      console.log(res);
      
    })
  }


  render() {
    return (
      <Container className = "pt-5">
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