import React from 'react';
import './TestList.css';
import { Alert, Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
import TestType from '../../types/TestType';
import api, { ApiResponse } from '../../api/api';
import { Link, Redirect, } from 'react-router-dom';
import { TestApiResponseDto } from '../../ApiResponseDto/TestApiResponse.dto';
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu';


interface TestListProperties {
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



export class TestList extends React.Component<TestListProperties> {
 
  state: TestPageState

  constructor(props: Readonly<TestListProperties>) {
    super(props)
    this.state = {
      isLoggedin:true,
      message: "",

    }

  }


 // /profesor/${this.props.match.params.id} ?filter=testId||$eq||1
  getProfessorTests() {
    api(`api/test/?filter=professorId||$eq||${this.props.match.params.id}`,"get", {}, "profesor")
    .then((res:ApiResponse)=>{
      if(res.status === 'ok'){
        console.log("res: ", res)
          if(res.data.length === 0) {
            this.setMessage("Nemate nijedan test");
            return;
          } 
          this.setMessage("")
          this.putDataInState(res.data);
          return;
        }
        if(res.status === "login") {
          this.setMessage("login");
          return;
        }
        this.setMessage("Doslo je do greske")
    
      })

  }

  private putDataInState(data: TestApiResponseDto[]){
    console.log("dataForState: ", data);
    const testsForState: TestType[] = data?.map(item =>{
      return {
        id: item.testId,
        professorId: item.professorId,
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
 

 setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  activateTest = (id: number) => {
        api(
          `api/test/${id}`,
          "patch",
          {
            isActive: 1
          },
          "profesor")
          .then((res) => {
            console.log(res)
            if(res.status === "error") {
              this.setMessage("Doslo je do greske")
              return;
            }
            
            this.getProfessorTests()
          })       
  }
  deactivateTest = (id: number) => {
    api(
      `api/test/${id}`,
      "patch",
      {
        isActive: 0
      },
      "profesor")
      .then((res) => {
        console.log(res)
        if(res.status === "error") {
          this.setMessage("Doslo je do greske")
          return;
        }
        this.getProfessorTests()
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
          <Alert className = "mt-3" variant= {variant}>{this.state.message}</Alert>  
        </Container>    
      )
        
    }
    
    return (
     <> 
      <SpecificMainMenu case= {"profesor"} id= {this.props.match.params.id}/>
      <Container className="borderLR px-0">
        {this.state.tests?.map(this.showProfessorTest)}
      </Container>
    </> 
    );
  }
   showProfessorTest = (test: TestType) => {
    return (
      <ListGroup key={test.id}>
        <ListGroup.Item className="p-1 pl-2">
          <Row noGutters>
            <b className="testName">{test.testName}</b>
          </Row>
          <Row noGutters>
            <Col xs="auto">
              <p className="testInfo">Vreme trajanja: {test.duration} </p>
            </Col>
            <Col>
              <ButtonGroup className="float-right">
                {test.isActive ? 
                <Button 
                  className=" p-1 mr-1 mt-2"
                  onClick ={this.deactivateTest.bind(this, test.id!)}
                  >Deaktiviraj</Button>
                :<Button 
                  className=" p-1 mr-1 mt-2"
                  onClick ={this.activateTest.bind(this, test.id!)}>Activiraj</Button>
                  }
                <Button 
                  className=" p-1 mr-1 mt-2">
                  <Link
                    to = {`test/${test.id}/izmeni`} 
                    className= "LinkStyle" >Izmeni
                  </Link>
                  </Button>
                <Button 
                  className=" p-1 mt-2">
                    <Link
                      to = {`test/${test.id}/`} 
                      className= "LinkStyle" >Pitanja
                    </Link>
                  </Button>
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

    
  componentDidUpdate(prevProps: TestListProperties, prevState: TestPageState ) {
    if(this.props !== prevProps){
      console.warn("Change Props")
      this.getProfessorTests();
     
  }
   } 
  
  

}
export default TestList;