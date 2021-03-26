import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api, { ApiResponse } from "../../api/api";
import SpecificMainMenu from "../SpecificMainMenu/SpecificMainMenu";
import "./StudentRegistration.css";

interface StudentRegistrationProperties {
  match:{
    params:{
      id: number
    }
  }
}


interface StudentRegistrationPageState{
  username: string 
  password: string
  forename:string
  surname: string
  message?: string

}


export class StudentRegistration extends React.Component<StudentRegistrationProperties> {
    state: StudentRegistrationPageState

  constructor(props: StudentRegistrationProperties){
    super(props)

      this.state = {
        username: "",
        password: "",
        forename: "",
        surname: "",

      }
    
  }

  private compliteRegistration() {
    const path = "api/student/";
    const data = {
      username: this.state.username,
      password: this.state.password,
      forename: this.state.forename,
      surname: this.state.surname
    }
    
    api(
      path,
      "post",
      data,
      "profesor"
      )
    .then((res: ApiResponse) => {
     console.log(res);
      if(res.status === "error") {
        this.setMessage("Could you try that again please")
        return;
      }  
        if(res.status === "login") {
          this.setMessage("login");
          return;
        }
      
        
        if(res.data.statusCode !== undefined){
          switch (res.data.statusCode) {
            case -1001: this.setMessage('This user already exists!');
            break;
            
        }
          
          return;
        }
        this.setMessage('');
        

    })
  }
  

  render() {
    if(this.state.message === "login") {
      return <Redirect to = "#"></Redirect>
    }
    return (
      <Container className=" px-0">
        <SpecificMainMenu case= {"profesor"} />
        <p className = "text-center lead">Registracija studenta</p>
        <Col md = {{ span:6, offset: 3} } >
          <Form className = "px-lg-5">
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                id = "username" 
                type="username"
                required
                value = { this.state.username }
                onChange = {event=>{this.formInputChangeHandler(event as any)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ime</Form.Label>
              <Form.Control
                id = "forename"
                required
                value = { this.state.forename }
                onChange = {event=>{this.formInputChangeHandler(event as any)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                id = "surname"
                required
                value = { this.state.surname} 
                onChange = {event=>{this.formInputChangeHandler(event as any)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                id = "password" 
                type="password"
                required
                value = { this.state.password}
                onChange = {event=>{this.formInputChangeHandler(event as any)}} />
            </Form.Group>
            {this.state.message === "Could you try that again please" ? <Alert variant = "danger" >{ this.state.message }</Alert> : null }
            <Button
              variant="primary"
              type="submit"
              onClick= { () => this.compliteRegistration() }>
              Prijavi studenta
            </Button>
          </Form>
        </Col>
      </Container>


    )
  }
  private formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    const newState = Object.assign(this.state, { 
      [event.target.id ]: event.target.value
    })
    
    this.setState(newState);
    console.log(this.state);
  }
  private setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }
  private RegistratinComplite() {
    const newState = Object.assign(this.state,{
      isRegistrationComplited: true
    })
    this.setState(newState);
  } 
}

export default StudentRegistration