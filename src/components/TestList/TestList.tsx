import React from 'react';
import './TestList.css';
import { Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
import TestType from '../../types/TestType';
import QuestionType from '../../types/QuestionType';


interface PageProperties {
  match: {
    params: {
      pId: number;
    }
  }
}
interface TestPageState {
  tests?: TestType[]
}


export class TestList extends React.Component<PageProperties> {

  state: TestPageState

  constructor(props: Readonly<PageProperties>) {
    super(props)
    this.state = {

    }

  }

  render() {
    return (
      <Container className="borderLR px-0">
        {this.state.tests?.map(this.addTest)}
        {console.log("render")}
      </Container>

    );

  }

  private addTest(test: TestType) {
    return (
      <ListGroup key={test.testId}>

        <ListGroup.Item className="p-1 pl-2">
          <Row noGutters>
            <p className="testName">{test.name}</p>
          </Row>
          <Row noGutters>
            <Col xs="auto">
              <p className="testInfo">Broj pitanja: {test.numOfQuestions}</p>
              <p className="testInfo">Vreme trajanja: {test.duration} </p>
            </Col>
            <Col>
              <ButtonGroup className="float-right">
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
    this.getPageData(); 
    console.log("mounting",this.props.match.params.pId)
    console.log(this.props.match.params.pId)

  }
  UNSAFE_componentWillReceiveProps(nextProp: PageProperties) {
    if (nextProp.match.params.pId !== this.props.match.params.pId) {
      console.log("willUpdate")
      this.getPageData();
    } else {
      
      return
    }
  }

  /* componentDidUpdate(prevProps: PageProperties, prevState: TestType[]) {
    if (this.props.match.params.pId !== prevProps.match.params.pId) {
      console.log("Props updated")
      this.getPageData()
      console.log("stateUpdate")
    } */


  private getPageData() {
    const data: TestType = {
      testId: 1,
      name: "Test 1",
      numOfQuestions: 60,
      duration: 30
    }
    const data1: TestType = {
      testId: 1,
      name: "Test 2",
      numOfQuestions: 100,
      duration: 75
    }
    this.setState({
      tests: [data, data1],

    })
  }

}
export default TestList;