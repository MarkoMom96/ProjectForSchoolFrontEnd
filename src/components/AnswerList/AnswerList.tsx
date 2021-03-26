import React  from "react";
import { Alert, Button, ButtonGroup, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import api, { ApiResponse } from "../../api/api";
import { AnswerApiResponseDto } from "../../ApiResponseDto/AnswerApiResponse.dto";
import AnswerType from "../../types/AnswerTyper";
import SpecificMainMenu from "../SpecificMainMenu/SpecificMainMenu";

interface AnswerListProperties {
  match:{
    params: {
      tId: number
      qId: number
      aId: number
    }
  }
}
interface AnswerListState {
  questionName: string
  NumberOfCorrentAnswers: number
  answers: AnswerType[]
  message: string

}


export default class AnswerList extends React.Component<AnswerListProperties> {

  state: AnswerListState;
  constructor(props: AnswerListProperties) {
    super(props)

    this.state = {
      questionName: "",
      NumberOfCorrentAnswers: 0,
      answers: [],
      message: ""
    }
  }

  getAnswersForQuestion() {
    api(`api/question/${this.props.match.params.qId}`,"get", {}, "profesor")
    .then((res:ApiResponse)=>{
      console.log(res.data)
      if(res.status === 'ok'){
           if(res.data.length === 0) {
            this.setMessage("Nema ponudjenih odgovora za ovaj test");
            return;
          } 
          const correctAns = this.countCorrectAnswers(res.data.questionAnswers);
          this.setState(Object.assign(this.state,{
            NumberOfCorrentAnswers: correctAns,
            questionName: res.data.questionName
          }))
          this.setMessage("")
          this.putQuestinsInState(res.data.questionAnswers);
          return; 
          
        
        }
        this.setMessage("Doslo je do greske")
    })
  }

  countCorrectAnswers(data: AnswerApiResponseDto[]){
    let correctAnswers = 0;
    for (const answer of data) {
      if(answer.isCorrectAnswer)
        correctAnswers++
    }
    return correctAnswers;
      
    }
  
  putQuestinsInState(data: AnswerApiResponseDto[]) {
    const answersForState: AnswerType[] = data.map(item=>{
      return {
        id: item.questionAnswerId,
	      questionId: item.questionId,
	      name: item.answerName,
	      isCorrectAnswer: item.isCorrectAnswer
      }
    });
    this.setState(Object.assign(this.state, {
      answers: answersForState
    
    }))
    console.log("state = ",this.state);
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
        <SpecificMainMenu 
        case = {"profesorAnswer"} 
        tId = {this.props.match.params.tId} 
        qId = {this.props.match.params.qId} />
        <Card>
        <Card.Title className = " mt-1 pl-3" style = {{textAlign:'center',fontSize:"26px"}}>{this.state.questionName}</Card.Title>
          <Card.Subtitle  className = "mb-2" style = {{textAlign:'center'}}>{`Broj tacnih odgovora: ${this.state.NumberOfCorrentAnswers}`}</Card.Subtitle >
        <Card.Body className = "p-0">
          <ListGroup>
            {this.state.answers?.map(this.showAnswersForQuestion)}     
          </ListGroup>
        </Card.Body>
      </Card>
      </Container>
    )
  }
  showAnswersForQuestion =  (answer: AnswerType) => {
    return (
      
        <ListGroup.Item key={answer.id} className="p-1 pl-2">
          <Row noGutters>
            <p className="testName">{answer.name} {answer.isCorrectAnswer ? ` (correct answer)`: null}</p>
          </Row>
          <Row noGutters>
            <Col>
              <ButtonGroup className="float-right">
                <Button 
                  className=" p-1 mt-2">
                    <Link
                      to = {{
                        pathname: `odgovor/${answer.id}/izmeni`,
                        state: {
                          correctAnswer:answer.isCorrectAnswer,
                          name: answer.name
                        }
                      }}
                      className= "LinkStyle" >Izmeni
                    </Link>
                  </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroup.Item>
     
    )
  
  }
  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  componentDidMount() {
    console.warn("mount");
    this.getAnswersForQuestion();
  }
  componentDidUpdate(prevProps: AnswerListProperties, prevState: AnswerListState ) {
    if(this.props !== prevProps){
      console.warn("Change Props")
      this.getAnswersForQuestion();
   
  }
  } 




}