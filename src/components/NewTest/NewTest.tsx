import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";


interface NewTestState {
  name: string
  duration: number
  professorId: number | undefined
}

export class NewTest extends React.Component {
  state: NewTestState;
  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.state = {
      name: "",
      duration: 30,
      professorId: undefined
    }
  }



  private createTest() {
    const data = {
      name:this.state.name
    }
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
                id = "name"
                type="username"
                value = {this.state.name}
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
              type="submit">
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