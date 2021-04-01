import React, { Component } from 'react'
import { Alert, Button, ButtonGroup, Col, Container, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api, { ApiResponse } from '../../api/api'
import { TestApiResponseDto } from '../../ApiResponseDto/TestApiResponse.dto'
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu'

interface EditTestProperties {
  match: {
    params: {
      tId: number;
    }
  }
}


interface EditTestState{
  testName: string
  duration: number
  maxScore: number
  message: string
}


export default class EditTest extends Component<EditTestProperties> {

  state: EditTestState
  constructor(props: EditTestProperties) {
    super(props)

    this.state = {
      testName: "",
      duration: 0,
      maxScore: 0,
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
        duration: this.state.duration,
        maxScore: this.state.maxScore
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
  getTestInfo() {
    api(`api/test/${this.props.match.params.tId}`, "get", {} , "profesor")
    .then((res:ApiResponse) => {
      console.log(res);
      if(res.status === "login") {
        this.setMessage("login")
        return;
      }
      if(res.status === "error") {
        this.setMessage("Doslo je do greske")
        return
      }
      this.putDataInState(res.data)

    })
  }
  putDataInState(data: TestApiResponseDto){
    this.setState({
      testName: data.testName,
      duration: data.duration,
      maxScore: data.maxScore
    })
    
  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  render() {
    return (
      <Container className="px-0">
        <SpecificMainMenu case= {"profesor"} />
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
            <Form.Group>
              <Form.Label>Maksimalni broj poena</Form.Label>
              <Form.Control
                id = "maxScore" 
                type = "number"
                value = {this.state.maxScore}
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
                to = {`/api/profesor/moji_testovi`} >Nazad</Link>
            </Button>
            </ButtonGroup>
            {this.state.message? <Alert className = "mt-3" variant= "danger">{this.state.message}</Alert>: null}
          </Form>
        </Col>
      </Container>
    )
  }

  componentDidMount() {
    this.getTestInfo()
  }
  componentDidUpdate(oldProps: EditTestProperties){
    if(oldProps.match.params.tId !== this.props.match.params.tId) {
      this.getTestInfo()
    }
  }
 
}
