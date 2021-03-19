import React, { Component } from 'react'
import { Alert, Button, ButtonGroup, Col, Container, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api from '../../api/api'

interface EditTestProperties {
  match: {
    params: {
      id: number
      tId: number;
    }
  }
}


interface EditTestState{
  testName: string
  duration: number
  message: string
}


export default class EditTest extends Component<EditTestProperties> {

  state: EditTestState
  constructor(props: EditTestProperties) {
    super(props)

    this.state = {
      testName: "",
      duration: 0,
      message: ""
    }
  }

  formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    this.setState(Object.assign(this.state,{
      [event.target.id]: event.target.value
    }))
    console.log(this.state)
  }
  modifyTest = () => {
    
    api(
      `api/test/${this.props.match.params.tId}`,
      "patch",
      {
        testName: this.state.testName,
        duration: this.state.duration
      },
      "profesor")
      .then((res) => {
        console.log(res)
        if(res.status === "error") {
          this.setMessage("Doslo je do greske")
          return;
        }
        this.setMessage("");

      })       
  
  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  render() {
    return (
      <Container>
        <p className = "text-center lead" >Uredjivanje testa</p>
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
            <ButtonGroup>
              <Button 
                variant="primary" 
                type="submit"
                onClick = {()=> this.modifyTest()}  >
                Sacuvaj
              </Button>
              <Button
              className = "ml-1" 
              variant="secondary">
              <Link 
                className = "LinkStyle" 
                to = {`/api/profesor/${this.props.match.params.id}/moji_testovi`} >Nazad</Link>
            </Button>
            </ButtonGroup>
            {this.state.message? <Alert className = "mt-3" variant= "danger">{this.state.message}</Alert>: null}
          </Form>
        </Col>
      </Container>
    )
  }
 
}
