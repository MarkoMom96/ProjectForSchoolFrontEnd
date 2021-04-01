import React from 'react'
import { Alert, Button, ButtonGroup, Col, Container, Form, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import { AnswerApiResponseDto } from '../../ApiResponseDto/AnswerApiResponse.dto';

interface EditAnswerProperties {
  match:{
    params: {
      tId: number
      qId: number
      aId: number
    }
  }
}

interface EditAnswerState {
  answerName: string
  isCorrectAnswer: boolean
  message: string
}


export default class EditAnswer extends React.Component<EditAnswerProperties> {
  
  state: EditAnswerState;

  constructor(props:EditAnswerProperties){
    super(props)

    this.state = {
      answerName: "",
      isCorrectAnswer: false,
      message: ""
    }
  }
  
  formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    this.setState(Object.assign(this.state,{
      [event.target.id]: event.target.value
    }))
    console.log(this.state)
  }
  checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(Object.assign(this.state,{
      isCorrectAnswer: event.target.checked
    }))
    console.log(this.state)
  }

  
  changeAnswer = () => {
    let value;
    this.state.isCorrectAnswer ? value = 1 : value = 0;
    const data = {
      isCorrectAnswer: value,
      answerName: this.state.answerName
    }
    api(`api/question-answer/${this.props.match.params.aId}`,"patch",data,"profesor")
    .then((res: ApiResponse) => {
       console.log(res);
      
        if(res.status === "error") {
          this.setMessage("Doslo je do greske")
          return;
        }
        
        this.setMessage("");

    })
  }

  getAnswerInfo() {
    api(`api/question-answer/${this.props.match.params.aId}`, "get", {} , "profesor")
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
  putDataInState(data: AnswerApiResponseDto){
    let correctAnswer = 0
    
    this.setState({
      answerName: data.answerName,
      isCorrectAnswer: data.isCorrectAnswer
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
      <p className = "text-center lead" >Izmena odgovora</p>
      <Col md = {{span: 8, offset: 2}} className = "p-0">
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
            onChange = {this.checkBoxHandler}
            >
            

           </FormCheck.Input>
           <Form.Check.Label className = "ml-5">Tacan Odgovor</Form.Check.Label>
         </FormCheck>
          
          <ButtonGroup className = "mt-4" >
            <Button 
              variant="primary" 
              type="submit"
               onClick = {this.changeAnswer}  >
              Sacuvaj
            </Button>
            <Button
              className = "ml-1" 
              variant="secondary">
              <Link 
                className = "LinkStyle" 
                to = {`/api/profesor/test/${this.props.match.params.tId}/pitanje/${this.props.match.params.qId}/`} >Nazad</Link>
            </Button>
          </ButtonGroup>
          {this.state.message? <Alert className = "mt-3" variant= "danger">{this.state.message}</Alert>: null}
        </Form>
      </Col>
    </Container>
    )

  }
  componentDidMount() {
    this.getAnswerInfo()
  }
  componentDidUpdate(oldProps: EditAnswerProperties){
    if(oldProps.match.params.aId !== this.props.match.params.aId) {
      this.getAnswerInfo()
    }
  }
  
 
  
}
