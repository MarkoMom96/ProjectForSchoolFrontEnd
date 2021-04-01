import React from "react";
import { Alert, Button, Col, Container, Form, FormCheck } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../../api/api";
import SpecificMainMenu from "../SpecificMainMenu/SpecificMainMenu";

interface NewAnswerProps{
  match: {
    params: {
      tId: number;
      qId: number;
      
    }
  }
}
interface NewAnswerState {
  answerName: string
  isCorrectAnswer: boolean
  message: string
  
}

export default class NewAnswer extends React.Component<NewAnswerProps> {
  state: NewAnswerState;
  constructor(props: NewAnswerProps) {
    super(props)

    this.state = {
      answerName: "",
      isCorrectAnswer: false,
      message: "",
      
    }
  }
  private createTest() {
    let value;
    this.state.isCorrectAnswer ? value = 1 : value = 0;
    const data = {
      questionId: this.props.match.params.qId,
      answerName:this.state.answerName,
      isCorrectAnswer: value

    }
  
    api("api/question-answer", "post", data, "profesor")
    .then((res)=>{
      if(res.status === "error") {
        this.setMessage("Doslo je do greske!")
        return;
      }
      if(res.status === "login") {
        this.setMessage("login")
        return;
      }
      this.setMessage("Odgovor uspesno dodat!")
      
    })
  }
  

  render() {
    if(this.state.message === "login") {
      return <Redirect to = "#"></Redirect>
    }
    return(
      <Container className="px-0">
      <SpecificMainMenu case= {"profesorQuestion"}/>
      <p className = "text-center lead" >Dodavanje pitanja</p>
      <Col md = {{span: 8, offset: 2}}>
        <Form>
          <Form.Group >
            <Form.Label>Naziv odgovora</Form.Label>
            <Form.Control 
              id = "answerName"
              type="username"
              value = {this.state.answerName}
              onChange = {event=>{this.formInputChangeHandler(event as any)}} />
          </Form.Group>
          <FormCheck className = "p-0 ml-0">
           <FormCheck.Input
            style = {{width:"20px", height: "20px"}} 
            className = "ml-2"
            onChange = {this.checkBoxHandler} >

           </FormCheck.Input>
           <Form.Check.Label className = "ml-5">Tacan Odgovor</Form.Check.Label>
         </FormCheck>
         
          <Button 
            className = "mt-3"
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
  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }
  checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(Object.assign(this.state,{
      isCorrectAnswer: event.target.checked
    }))
  }

}