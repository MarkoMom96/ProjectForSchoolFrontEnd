import React, { Component } from 'react'
import { Alert, Button, ButtonGroup, Card, Container, FormCheck, FormGroup, ListGroup } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import { Redirect } from 'react-router-dom'
import api, { ApiResponse } from '../../api/api'
import { TestApiResponseDto } from '../../ApiResponseDto/TestApiResponse.dto'
import AnswerType from '../../types/AnswerTyper'
import GivenAsnwerType from '../../types/GivenAnswerType'
import QuestionType from '../../types/QuestionType'
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu'

interface TestInProgressProperties {
  match:{
    params:{
      tId: number
    }
  }
}
interface TestInProgressState {
  testName: string
  duration: number
  message: string
  questions: QuestionType[]
  currentQuestionIndex: number
  givenAnswers: any[]
  currentAnswerId: (string | null)[]
  renderData: boolean
}

export default class TestInProgress extends React.Component<TestInProgressProperties> {
   
  state: TestInProgressState

  constructor(props: TestInProgressProperties){
    super(props)
    
    this.state = {
      testName: "",
      duration: 0,
      message: "",
      questions: [],
      currentQuestionIndex: 0,
      givenAnswers: [],
      currentAnswerId: [],
      renderData: false
    } 
  }

   getTest(){
    api(`api/test/startTest/${this.props.match.params.tId}`, "get", {}, "student")
    .then((res: ApiResponse) => {
      console.log(res)
      if(res.status === "error") {
        this.setMessage("Doslo je do greske!")
        return;
      }
      if(res.status === "login"){
        this.setMessage("login")
        return
      }
      this.setMessage("")
    
      if(res.data.questions !== undefined)
        this.putDataInState(res.data);
       
    })
    
    }

  endTest = () => {
    this.nextQuestion()
    const data = this.state.givenAnswers
   api(`api/test/finishTest/${this.props.match.params.tId}`,"post", data,"student")
   .then((res:ApiResponse) => {
     console.log(res)
   })
  }
  putDataInState(data: TestApiResponseDto) {

 
    this.setState(Object.assign(this.state,{
      testName: data.testName,
      duration: data.duration,
      questions: data.questions,
      renderData: true
    }))
    console.log(this.state)
    
  }

 

  render() {
    
    if(this.state.message === "login") {
      return <Redirect to = "#"></Redirect>
    }


    if(this.state.message !== "") {
      let variant = "info";
      if(this.state.message === "Doslo je do greske") variant = "danger";

      return (
        <Container>
          <SpecificMainMenu case= {"student"}/>
          <Alert variant = "danger">{this.state.message}</Alert>
        </Container>    
      )
        
    }
    const num = this.state.currentQuestionIndex
    
    let showButton = true;

    if(num === this.state.questions.length-1) showButton = false;
    if(this.state.renderData) {

      return (
        
        <Container className="borderLR px-0">
          <Card>
              <Card.Title className = "px-3">{this.state.testName}</Card.Title>
              <Card.Subtitle 
              className = "px-3" 
              >Pitanje {num+1}/{this.state.questions.length}</Card.Subtitle>
              <Card.Body className = "mt-2 mx-0 py-2" style = {{borderTop: "1px black solid"}}>
                  <p>{this.state.questions[num]?.questionName}</p>
                  <ListGroup className = "mb-2">
                    {this.state.questions[num]?.numberOfCorrectAnswers > 1 ? 
                     this.state.questions[num]?.questionAnswers?.map(this.showAnswersCheckBox) :
                     this.state.questions[num]?.questionAnswers?.map(this.showAnswersRadio) }
                       
                  </ListGroup>
                  <ButtonGroup className = "float-right">
                  {showButton ?
                    <Button 
                    className = "mr-1"
                    onClick = {this.nextQuestion} >Sledece pitanje</Button> : null }
                    <Button
                      onClick = {this.endTest}>Kraj rada</Button>
                  </ButtonGroup>
              </Card.Body>
          </Card>
        </Container>
       
      );
    }
    return null
  }
  showAnswersRadio =  (answer: AnswerType) => {
    return (
      <ListGroup.Item key = {answer.questionAnswerId}>
        <FormGroup>
          <FormCheck>
            <FormCheckInput
              id = "currentAnswerId" 
              name = {`${this.state.currentQuestionIndex}`} 
              type = "radio"
              value = {answer.questionAnswerId}
              onChange = {this.radioClickHandler}/>
            <FormCheckLabel htmlFor = {`${this.state.currentQuestionIndex}`} >{answer.answerName}</FormCheckLabel>
          </FormCheck>
        </FormGroup>
      </ListGroup.Item>
  
    )
  }
  showAnswersCheckBox =  (answer: AnswerType) => {
    return (
      <ListGroup.Item key = {answer.questionAnswerId}>
        <FormGroup>
          <FormCheck>
            <FormCheckInput
              id = "currentAnswerId" 
              name = {`${this.state.currentQuestionIndex}`} 
              type = "checkbox"
              value = {answer.questionAnswerId}
              onChange = {this.checkBoxClickHandler}/>
            <FormCheckLabel htmlFor = {`${this.state.currentQuestionIndex}`} >{answer.answerName}</FormCheckLabel>
          </FormCheck>
        </FormGroup>
      </ListGroup.Item>
  
    )
  }

  nextQuestion = () => {
    if(this.state.currentAnswerId !== []){
            
      this.setState(Object.assign(this.state, {
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        givenAnswers: [...this.state.givenAnswers, this.state.currentAnswerId],
        currentAnswerId: []

      }))
      console.log(this.state)
      return
    }
    this.setState(Object.assign(this.state, {
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    }))
    console.log(this.state)

  }

  radioClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    this.setState(Object.assign(this.state,{
      currentAnswerId: +[event.target.value]
    }))
    console.log(this.state)
  }

  checkBoxClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value
    if(!this.state.currentAnswerId.includes(id)){
      this.setState(Object.assign(this.state,{
        currentAnswerId: [...this.state.currentAnswerId, +id]
      }))
      console.log(this.state)
      return
    }
    
    if(this.state.currentAnswerId.length === 1){
      this.setState(Object.assign(this.state,{
        currentAnswerId: []
      }))
    }
    const index = this.state.currentAnswerId.indexOf(id)
    this.state.currentAnswerId.splice(index, 1);
    console.log(this.state)

  }




  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  componentDidMount() {
    console.warn("render")
    this.getTest();
    
  }
}
