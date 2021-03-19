import React from "react";
import "./Login.css";
import { Alert, Button, Col, Container, Form,} from "react-bootstrap";
import api, { ApiResponse, saveToken, saveRefreshToken, saveRole, saveUserInfo } from "../../api/api";
import { Redirect } from "react-router-dom";


interface LoginPageState{
  username: string
  password: string
  role: "student" | "profesor"
  errorMessage: string
  isLoggedIn: boolean
  userId: number | undefined
}

export class Login extends React.Component {

  state: LoginPageState;

  constructor(props: {} | Readonly<{}>){
    super(props)

    this.state = {
      username: "",
      password: "",
      role: "student",
      errorMessage: "",
      isLoggedIn: false,
      userId: undefined
    }
  };

  private doLogin() {
    const path = `auth/${this.state.role}/login/`;
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    
    api(
      path,
      "post",
      data,
      this.state.role
      )
      
    .then((res: ApiResponse) => {
     
      if(res.status === "error") {
        this.errorMessageChange("Could you try that again please")
        return;
      }
        
        if(res.data.statusCode !== undefined){
          switch (res.data.statusCode) {
            case -3001: this.errorMessageChange('This user does not exist!'); break;
            case -3002: this.errorMessageChange('Bad password!'); break;
        }
          
          return;
        }
        console.log(res);
        this.setUserId(res.data.id);
        this.setLoginState(true);
        
        saveToken(this.state.role, res.data.token);
        saveRefreshToken(this.state.role, res.data.refreshToken);
        saveRole(this.state.role);
        console.log(res.data.userInfo);
        saveUserInfo(res.data.userIfno);

 
    })
  }

  private setUserId(id: number){
    const newState = Object.assign(this.state, { 
      userId: id
    })
    
    this.setState(newState);
    
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
  private setLoginState(loginState: boolean) {
    const newState = Object.assign(this.state,{
      isLoggedIn: loginState
    })
    this.setState(newState);
  }

  render() {
     if(this.state.isLoggedIn === true) {
      const role = this.state.role;
      const userId = this.state.userId;
    
      const newRoute = `api/${role}/${userId}/moji_testovi`
      return (
     
        <Redirect to = {newRoute}></Redirect>
        
       
      )
    } 
    return (
      <Container>
        <Col md = {{ span:6, offset: 3} }>
        <p id = "formMassage">Ulogujte se da bi ste koristili aplikaciju</p>
        <Form>
          <Form.Group >
            <Form.Label htmlFor = "username">Korisnicko ime/Indeks</Form.Label>
            <Form.Control 
              id = "username" 
              type = "username" 
              value = { this.state.username }
              onChange = {event=>{this.formInputChangeHandler(event as any)}}
              />
          </Form.Group>
          <Form.Group >
            <Form.Label htmlFor = "password">Lozinka</Form.Label>
            <Form.Control  
              id = "password"
              type = "password"
              value = { this.state.password }
              onChange = {event=>{this.formInputChangeHandler(event as any)}}
               />
          </Form.Group>
          <Form.Group >
          <Form.Label htmlFor = "role">Ja sam</Form.Label>
          <Form.Control 
              id = "role"
              as = "select" 
              custom
              onChange = {event => {this.formInputChangeHandler(event as any)}} >
            <option value = "student" id = "student">Student</option>
            <option value = "profesor" id = "profesor">Profesor</option>
          </Form.Control>
          </Form.Group>
          {this.state.errorMessage ? <Alert variant = "danger" >{ this.state.errorMessage }</Alert> : null }
          <Button 
            variant = "primary"
            type = "submit"
            onClick= { () => this.doLogin() }>
            Uloguj se
          </Button>
        </Form>
        </Col>
        
      </Container>


    )
  }


}