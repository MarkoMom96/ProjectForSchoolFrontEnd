import React from "react";
import "./Login.css";
import { Button, Container, Form } from "react-bootstrap";

export class Login extends React.Component {

  render() {
    return (
      <Container>
        <p id = "formMassage">Ulogujte se da bi ste koristili aplikaciju</p>
        <Form id = "logInForm">
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Korisnicko ime (indeks)</Form.Label>
            <Form.Control type="username"/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Ja sam</Form.Label>
          <Form.Control as="select" custom>
            <option>Student</option>
            <option>Profesor</option>
          </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Uloguj se
          </Button>
        </Form>
      </Container>


    )
  }


}