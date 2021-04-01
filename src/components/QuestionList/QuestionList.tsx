import React from 'react'
import { Alert, Button, ButtonGroup, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api, { ApiResponse } from '../../api/api'
import { QuestionApiResponseDto } from '../../ApiResponseDto/QuestionApiResponse.dto'
import QuestionType from '../../types/QuestionType'
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu'


interface QuestionListProperties {
  match: {
    params: {
      id: number;
      tId: number;
    }
  }
}
interface QuestionListState {
  testName: string
  numberOfQuestions: number
  questions: QuestionType[]
  message: string
}

export class QuestionList extends React.Component<QuestionListProperties> {

  state: QuestionListState
  constructor(props : QuestionListProperties) {
    super(props)
  
    this.state = {
      testName: "",
      numberOfQuestions: 0,
      questions: [],
      message: ""
    }
  }

  getQuestionsForTest() {
    api(`api/test/${this.props.match.params.tId}`,"get", {}, "profesor")
    .then((res:ApiResponse)=>{
      if(res.status === 'ok'){
          if(res.data.length === 0) {
            this.setMessage("Nema pitanja za test");
            return;
          } 
          this.setMessage("")
          this.putQuestinsInState(res.data.questions);
          this.setState(Object.assign(this.state, {
            testName: res.data.testName,
            numberOfQuestions: res.data.questions.length
          }))
          return;
          
        
        }
        this.setMessage("Doslo je do greske")
    })
  }
  
  
  putQuestinsInState(data : QuestionApiResponseDto[]) {
    const questionsForState: QuestionType[] = data.map(item=>{
      return {
        id: item.questionId,
        testId: item.testId,
        questionName: item.questionName,
        numberOfCorrectAnswers: item.numberOfCorrectAnswers
      }
    });
      this.setState(Object.assign(this.state, {
        questions: questionsForState
      }))



  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  showQestionForTest =  (question: QuestionType) => {
    return (
     
        <ListGroup.Item key={question.id} className="p-1 pl-2">
          <Row noGutters>
            <p className="testName">{question.questionName}</p>
          </Row>
          <Row noGutters>
            <Col>
              <ButtonGroup className="float-right">
                <Button 
                  className=" p-1 mr-1">
                    <Link
                      to = {`pitanje/${question.id}/izmeni`} 
                      className= "LinkStyle" >Izmeni
                    </Link>
                  </Button>
                  <Button 
                  className=" p-1">
                    <Link
                      to = {`pitanje/${question.id}/`} 
                      className= "LinkStyle" >Odgovori
                    </Link>
                  </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroup.Item>
    
    )
  
  }
  
render() {
  if(this.state.message !== "") {
    let variant = "info";
    if(this.state.message === "Doslo je do greske") variant = "danger";

    return (
      <Container >
        <Alert className = "mt-3" variant= {variant}>{this.state.message}</Alert>  
      </Container>    
    )
      
  }
  return(
    <Container className="borderLR px-0">
       <SpecificMainMenu case = {"profesorQuestion"} tId = {this.props.match.params.tId} />
      <Card>
        <Card.Title className = " mt-1 pl-3" style = {{textAlign:'center',fontSize:"26px"}}>{this.state.testName}</Card.Title>
          <Card.Subtitle  className = "mb-2" style = {{textAlign:'center'}}>{`Broj pitanja: ${this.state.numberOfQuestions}`}</Card.Subtitle >
        <Card.Body className = "p-0">
          <ListGroup>
            {this.state.questions?.map(this.showQestionForTest)}
          </ListGroup>
        </Card.Body>
      </Card>
       
    </Container>
  )
}
componentDidMount() {
  this.getQuestionsForTest(); 
}
componentDidUpdate(prevProps: QuestionListProperties, prevState: QuestionListState ) {
  if(this.props !== prevProps){
    console.warn("Change Props")
    this.getQuestionsForTest();
 
}
} 

 
}