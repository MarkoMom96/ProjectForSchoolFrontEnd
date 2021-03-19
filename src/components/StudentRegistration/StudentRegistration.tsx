import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import api, { ApiResponse } from "../../api/api";
import "./StudentRegistration.css";




interface StudentRegistrationPageState{
  username: string 
  password: string
  forename:string
  surname: string
  errorMessage?: string
  isRegistrationComplited: boolean

}


export class StudentRegistration extends React.Component {
    state: StudentRegistrationPageState

  constructor(props: {} | Readonly<{}>){
    super(props)

      this.state = {
        isRegistrationComplited:false,
        username: "",
        password: "",
        forename: "",
        surname: "",

      }
    
  }

  private compliteRegistration() {
    const regEx = "/^[0-9]{10}$/";
    if(!this.state.username.match(regEx)){
      this.errorMessageChange("Username must contain 10 numbers and nothing else");
      return;
    }

    const path = "http://localhost:3000/api/student/";
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
        this.errorMessageChange("Could you try that again please")
        return;
      }
        
        if(res.data.statusCode !== undefined){
          switch (res.data.statusCode) {
            case -1001: this.errorMessageChange('This user already exists!');
            console.log(res);
            break;
            
        }
          
          return;
        }
        console.log(res);
        this.errorMessageChange('');
        this.RegistratinComplite();

    })
  }
  

  render() {
    return (
      <Container >
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
            {this.state.errorMessage ? <Alert variant = "danger" >{ this.state.errorMessage }</Alert> : null }
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
  private errorMessageChange(message: string) {
    const newState = Object.assign(this.state,{
      errorMessage: message
    })
    this.setState(newState);
  }
  private RegistratinComplite() {
    const newState = Object.assign(this.state,{
      isRegistrationComplited: true
    })
    this.setState(newState);
  } 
}

export default StudentRegistration