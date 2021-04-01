import React from 'react'
import { Alert, Button, ButtonGroup, Col, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import { QuestionApiResponseDto } from '../../ApiResponseDto/QuestionApiResponse.dto';
import SpecificMainMenu from '../SpecificMainMenu/SpecificMainMenu';

interface EditQuestionProperties{
  match:{
    params:{
      tId: number
      qId: number
      
    }
  }
}

interface EditQuestionState{
  questionName: string
  message: string
}

export default class EditQuestion extends React.Component<EditQuestionProperties> {
  
  state: EditQuestionState;
  constructor(props: EditQuestionProperties){
    super(props)

    this.state = {
      questionName: "",
      message: ""

    }
  }

  modifyQuestion = () => {
    api(
      `api/question/${this.props.match.params.qId}`,
      "patch",
      {
        questionName: this.state.questionName,
      },
      "profesor")
      .then((res) => {
       
        if(res.status === "error") {
          this.setMessage("Doslo je do greske")
          return;
        }
        this.setMessage("");

      })       
  
  }

  getQuestionInfo() {
    api(`api/question/${this.props.match.params.qId}`, "get", {} , "profesor")
    .then((res:ApiResponse) => {
    
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
  putDataInState(data: QuestionApiResponseDto){
    this.setState({
      questionName: data.questionName
    })
    
  }

  formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    this.setState(Object.assign(this.state,{
      [event.target.id]: event.target.value
    }))
   
  }

  setMessage(message: string) {
    this.setState(Object.assign(this.state,{
      message: message
    }));
  }

  render() {
    return (
      <Container>
        <SpecificMainMenu case = {"profesorQuestion"} tId = {this.props.match.params.tId} />
        <p className = "text-center lead" >Izmena pitanja</p>
        <Col md = {{span: 8, offset: 2}}>
          <Form>
            <Form.Group >
              <Form.Label>Naziv testa</Form.Label>
              <Form.Control
                id = "questionName"
                type="username"
                value = {this.state.questionName}
                onChange = {event=>{this.formInputChangeHandler(event as any)}} />
            </Form.Group>
            <ButtonGroup >
              <Button 
                variant="primary" 
                type="submit"
                onClick = {this.modifyQuestion} >
                Sacuvaj
              </Button>
              <Button
                className = "ml-1" 
                variant="secondary">
                <Link 
                  className = "LinkStyle" 
                  to = {`/api/profesor/test/${this.props.match.params.tId}/`} >Nazad</Link>
              </Button>
            </ButtonGroup>
            {this.state.message? <Alert className = "mt-3" variant= "danger">{this.state.message}</Alert>: null}
          </Form>
        </Col>
    </Container>



    )
  }
  componentDidMount() {
    this.getQuestionInfo()
  }
  componentDidUpdate(oldProps: EditQuestionProperties){
    if(oldProps.match.params.qId !== this.props.match.params.qId) {
      this.getQuestionInfo()
    }
  }






}
