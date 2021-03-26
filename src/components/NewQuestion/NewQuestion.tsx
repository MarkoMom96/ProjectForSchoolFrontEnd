import React from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../../api/api";
import SpecificMainMenu from "../SpecificMainMenu/SpecificMainMenu";

interface NewQuestionProps{
  match: {
    params: {
      tId: number;
      qId: number;
      
    }
  }
}
interface NewQuestionState {
  questionName: string
  message: string
  
}

export default class NewQuestion extends React.Component<NewQuestionProps> {
  state: NewQuestionState;
  constructor(props: NewQuestionProps) {
    super(props)

    this.state = {
      questionName: "",
      message: "",
      
    }
  }
  private createTest() {
    const data = {
      testId: this.props.match.params.tId,
      questionName:this.state.questionName,
    }
    console.log(data);
    api("api/question", "post", data, "profesor")
    .then((res)=>{
      console.log(res);
      if(res.status === "error") {
        this.setMessage("Doslo je do greske!")
        return;
      }
      if(res.status === "login") {
        this.setMessage("login")
        return;
      }
      this.setMessage("Pitanje uspesno dodato!")
      
    })
  }
  

  render() {
    if(this.state.message === "login") {
      return <Redirect to = "#"></Redirect>
    }
    return(
      <Container className="px-0">
      <SpecificMainMenu case= {"profesorQuestion"} />
      <p className = "text-center lead" >Dodavanje pitanja</p>
      <Col md = {{span: 8, offset: 2}}>
        <Form>
          <Form.Group >
            <Form.Label>Naziv pitanja</Form.Label>
            <Form.Control 
              id = "questionName"
              type="username"
              value = {this.state.questionName}
              onChange = {event=>{this.formInputChangeHandler(event as any)}} />
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
    this.setState(Object.assign(this.state, { 
      [event.target.id ]: event.target.value
    }));
    console.log(this.state);
  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

}