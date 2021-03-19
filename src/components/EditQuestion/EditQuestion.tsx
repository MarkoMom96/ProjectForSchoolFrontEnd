import React from 'react'
import { Alert, Button, ButtonGroup, Col, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../api/api';

interface EditQuestionProperties{
  match:{
    params:{
      id: number
      tId: number
      qId: number
      
    }
  }
}

interface EditQuestionState{
  questionName: string
  message: string
}

export default class EditQuestion extends React.Component<EditQuestionProperties> {
  
  state: EditQuestionState;
  constructor(props: EditQuestionProperties){
    super(props)

    this.state = {
      questionName: "",
      message: ""

    }
  }

  modifyQuestion = () => {
    console.log(this.props.match.params)
    api(
      `api/question/${this.props.match.params.qId}`,
      "patch",
      {
        questionName: this.state.questionName,
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

  formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    this.setState(Object.assign(this.state,{
      [event.target.id]: event.target.value
    }))
    console.log(this.state)
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
              id = "questionName"
              type="username"
              value = {this.state.questionName}
              onChange = {event=>{this.formInputChangeHandler(event as any)}} />
          </Form.Group>
          <ButtonGroup >
            <Button 
              variant="primary" 
              type="submit"
              onClick = {this.modifyQuestion} >
              Sacuvaj
            </Button>
            <Button
              className = "ml-1" 
              variant="secondary">
              <Link 
                className = "LinkStyle" 
                to = {`/api/profesor/${this.props.match.params.id}/test/${this.props.match.params.tId}/`} >Nazad</Link>
            </Button>
          </ButtonGroup>
          {this.state.message? <Alert className = "mt-3" variant= "danger">{this.state.message}</Alert>: null}
        </Form>
      </Col>
    </Container>



    )
  }






}
