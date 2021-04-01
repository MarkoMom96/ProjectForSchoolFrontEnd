import React from 'react'
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import api, { ApiResponse } from '../../api/api'
import { FinishedTestApiResponseDto } from '../../ApiResponseDto/FinishedTestApiResponseDto'
import FinishedTestType from '../../types/FinishedTestType'
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu'



interface FinishedTestsState {
  passedTests?: FinishedTestType[]
  failedTests?: FinishedTestType[]
  testsToShow: "passed" | "failed"
  message: string
  

}

export default class FinishedTests extends React.Component {
  state: FinishedTestsState

  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.state = {
      passedTests: [],
      failedTests: [],
      testsToShow: "passed",
      message: "",
     
    }
  }

  getFinishedTests() {
    api(`api/finished-test/testsForStudent`,"get",{},"student")
    .then((res: ApiResponse) => {
    
      if(res.status === "login"){
        this.setMessage("login")
        return
      }
      if(res.status === "error") {
        this.setMessage("Doslo je do greske!")
        return
      }
      if(res.data.length === 0) {
        this.setMessage("Nije pronadjen nijedan test");
        return;
      }

      this.setMessage("");
      this.putDataInState(res.data);

    })
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
          <Alert className = "mt-3" variant= {variant}>{this.state.message}</Alert>  
        </Container>    
      )
        
    }
    return(
      <Container className = "borderLR px-0" >
        <SpecificMainMenu case= {"student"}/>
        <Row noGutters>
            <Col md={{ span: 6}}>
              <Button 
                variant="outline-dark" 
                block
                onClick = {() => {this.setState({testsToShow: "passed"})}}>
                  Polozeni ispiti</Button>
            </Col>
            <Col md={{ span: 6}}>
              <Button 
                variant="outline-dark" 
                block
                onClick = {() => {this.setState({testsToShow: "failed"})}}>
                  Nepolozeni ispiti</Button>
            </Col>
        </Row>
        <ListGroup>
          {this.state.testsToShow === "passed" ? 
            this.state.passedTests?.map(this.showFinishedTests) : 
            this.state.failedTests?.map(this.showFinishedTests) }     
          </ListGroup>
        
      </Container>
    )
  }
  showFinishedTests =  (finishedTest: FinishedTestType) => {
    const date = finishedTest.createdAt?.substring(0, 19).replace('T',' ');
    return (
      <ListGroup.Item key={finishedTest.finishedTestId} className="p-1 pl-2">
      <Row noGutters>
        <b className="testName">{finishedTest.test?.testName}</b>
      </Row>
      <Row noGutters>
        <Col xs="auto">
          <p className="testInfo">Poeni: {finishedTest.score} </p>
          <p className="testInfo">Datum polaganja: {date} </p>
        </Col>
      </Row>
    </ListGroup.Item>
  
)
  
  }

  putDataInState(data: FinishedTestApiResponseDto[]) {

    let passedTests: FinishedTestType[] = [];
    let failedTests: FinishedTestType[] = []
    for(let i = data.length-1; i >= 0; i--){
      data[i].isPassed === 1 ? passedTests.push(data[i]): failedTests.push(data[i]);
    }
    this.setState({
      passedTests: passedTests,
      failedTests: failedTests
    })
   

  }



  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }  
  componentDidMount() {
    this.getFinishedTests()
  }
}
