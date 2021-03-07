import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./StudentRegistration.css";

export class StudentRegistration extends React.Component {
  render() {
    return (
      <Container className = "pt-5">
        <p className = "text-center lead">Registracija studenta</p>
        <Form className = "px-lg-5">
          <Form.Group controlId="StudentIndeks">
            <Form.Label>Indeks</Form.Label>
            <Form.Control type="username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ime</Form.Label>
            <Form.Control/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Prezime</Form.Label>
            <Form.Control/>
          </Form.Group>
          <Form.Group controlId="StudentPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Prijavi studenta
          </Button>
        </Form>
      </Container>


    )
  }
}

export default StudentRegistration