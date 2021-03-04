import React from 'react';
import './MainContent.css';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';




export class TestItem {
      name: string = "";
      numOfQuestions: string = "";
      duration: string = "";
      

      constructor(name:string, numOfQuestions:string, duration:string){
          this.name = name;
          this.numOfQuestions = numOfQuestions;
          this.duration = duration;
      }
    
}

interface TestProperties {
    items:TestItem[];
}
interface ContentState {
  items:TestItem[];
}

export class MainContent extends React.Component<TestProperties> {
  
  state :ContentState;
  
  constructor(props: Readonly<TestProperties>){
    super(props)

    this.state = {
      items : props.items
    }

    
  }
  
  SetItems(items:TestItem[]){
    this.setState({
      items: items
    })

  }

  render() {
  return (

    <Container className="borderLR px-0">
      <ListGroup>
        { this.state.items.map(this.addTest) }
      </ListGroup>
    </Container>

  );
 
}

private addTest(item: TestItem) {
  return(
    <ListGroup.Item className="p-1 pl-2">
          <Row noGutters>
            <p className="testName">{ item.name }</p>
          </Row>
          <Row noGutters>
            <Col xs="auto">
              <p className="testInfo">Broj pitanja: { item.numOfQuestions }</p>
              <p className="testInfo">Vreme trajanja: { item.duration } </p>
            </Col>
            <Col>
              <Button href = "#" className="float-right p-1 mt-2">Pokreni test</Button>
            </Col>
          </Row>
        </ListGroup.Item>
  )
}


}
export default MainContent;