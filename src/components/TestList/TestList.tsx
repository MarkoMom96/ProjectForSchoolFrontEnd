import React from 'react';
import './TestList.css';
import { Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
import TestType from '../../types/TestType';
import QuestionType from '../../types/QuestionType';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';


interface PageProperties {
  match: {
    params: {
      id: number;
      role: string;
    }
  }
}
interface TestPageState {
  isLoggedin: boolean
  message: string
  tests?: TestType[]
}
interface ApiResponseTestDto {
  testId: number
  testName: string
  duration: number
  isActive: boolean
}


export class TestList extends React.Component<PageProperties> {

  state: TestPageState

  constructor(props: Readonly<PageProperties>) {
    super(props)
    this.state = {
      isLoggedin:true,
      message: ""
    }

  }

 private putDataInState(data: ApiResponseTestDto[]){
   
  const testsForState: TestType[] = data.map(item =>{
    return {
      testId: item.testId,
      testName: item.testName,
      duration: item.duration,
      isActive: item.isActive
    }
  });
      const newState = Object.assign(this.state,{
        tests: testsForState
      })
      this.setState(newState);
 }

  getProfessorTests() {
    api(`api/test/profesor/${this.props.match.params.id}`,"get", {}, "profesor")
    .then((res:ApiResponse)=>{
      console.log(res)
      if(res.status === 'ok'){
        if(!res.data.status) {
          this.setMessage("")
          this.putDataInState(res.data);
          return;
          }
        this.setMessage("Doslo je do greske")
        }
    })

  }
  setMessage(message: string) {
    const newState = Object.assign(this.state,{
      message: message
    })
    this.setState(newState);
  }

  render() {
    console.log(this.state)
    if(this.state.message !== "") {
      return (
        <Container>
          <p>{this.state.message}</p>    
        </Container>    
      )
        
    }
    return (
      <Container className="borderLR px-0">
        {this.state.tests?.map(this.showTest)}
      </Container>
      
    );
  }
  private showTest(test: TestType) {
    return (
      <ListGroup key={test.testId}>
        <ListGroup.Item className="p-1 pl-2">
          <Row noGutters>
            <p className="testName">{test.testName}</p>
          </Row>
          <Row noGutters>
            <Col xs="auto">
              <p className="testInfo">Broj pitanja: {test.questions?.length}</p>
              <p className="testInfo">Vreme trajanja: {test.duration} </p>
            </Col>
            <Col>
              <ButtonGroup className="float-right">
                {test.isActive ? <Button href="#" className=" p-1 mr-1 mt-2">Deaktiviraj</Button>
                 :<Button href="#" className=" p-1 mr-1 mt-2">Aktiviraj</Button> }
                <Button href="#" className=" p-1 mr-1 mt-2">Promeni</Button>
                <Button href="#" className=" p-1 mt-2">Pitanja</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    )
  }

  componentDidMount() {
    this.getProfessorTests(); 
  }
  //componentDidUpdate(){

  //}
    
    componentDidUpdate(prevProps: PageProperties, prevState: TestPageState ) {
      if(this.props !== prevProps){
        console.warn("Change Props")
        this.getProfessorTests();
     
     /* if(this.state !== prevState){
      console.warn("Change State")
      this.getProfessorTests();
     } */
  }
   } 
  
  

}
export default TestList;