import React from 'react'
import { Alert, Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import api, { ApiResponse } from '../../api/api'
import { TestApiResponseDto } from '../../ApiResponseDto/TestApiResponse.dto'
import TestType from '../../types/TestType'
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu'

interface ActiveTestsState {
  tests: TestType[]
  message: string
}

export default class ActiveTests extends React.Component {
 state: ActiveTestsState

 constructor(props: {} | Readonly<{}>) {
  super(props)

  this.state = {
    tests: [],
    message: ""

  }


 }
 getActiveTests(){
  api("api/test/activeTests","get",{}, "student")
  .then((res: ApiResponse)=>{
    console.log(res.data)
    if(res.status === "error") {
      this.setMessage("Doslo je do greske!")
      return;
    }
    if(res.status === "login"){
      this.setMessage("login")
      return
    }
    this.setMessage("")
    this.putDataInState(res.data);
  })
  
 }
 putDataInState(data: TestApiResponseDto[]){
  const testsForState: TestType[] = data?.map(item =>{
    return {
      id: item.testId,
      professorId: item.professorId,
      testName: item.testName,
      duration: item.duration,
      maxScore: item.maxScore,
      isActive: item.isActive
    }
  });
      const newState = Object.assign(this.state,{
        tests: testsForState
      })
      this.setState(newState);
      console.log("new State: ", this.state)

 }


 render() {
   if(this.state.message === "login"){
     return(
       <Redirect to = "/"/>
     )
   }
   if(this.state.message === "Doslo je do greske!") {
     return(
       <Container>
         <SpecificMainMenu case= {"student"}/>
         <Alert variant = "info">Nema aktivnih testova</Alert>
       </Container>
     )
   }
   return(
     <Container>
       <SpecificMainMenu case= {"student"}/>
       <ListGroup>
          {this.state.tests.map(this.showTest)}
       </ListGroup>
   </Container>
   )
   }

   showTest = (test: TestType) => {
      return(
        <ListGroup.Item key={test.id} className="p-1 pl-2">
          <Row noGutters>
            <b className="testName">{test.testName}</b>
          </Row>
          <Row noGutters>
            <Col xs="auto">
              <p className="testInfo">Vreme trajanja: {test.duration} </p>
              <p className="testInfo">Max. broj poena: {test.maxScore} </p>
            </Col>
            <Col>
              <ButtonGroup className="float-right">
                <Button 
                  className=" p-1 mt-2">
                    <Link
                      to = {`test/${test.id}`} 
                      className= "LinkStyle" >Pokreni test
                    </Link>
                  </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroup.Item>
     
      )
   }

  componentDidMount() {
  this.getActiveTests()

 }

  setMessage(message: string) {
  this.setState(Object.assign(this.state,{
    message: message
  }));
}

}