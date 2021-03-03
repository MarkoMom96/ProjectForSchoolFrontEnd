import React from "react";
import { Button, Container, Form } from "react-bootstrap";


export class NewTest extends React.Component {
  render() {
    return (
      <Container className = "pt-5">
        <p className = "text-center lead" >Kreiranje testa</p>
        <Form className = "px-lg-5">
          <Form.Group controlId="StudentIndeks">
            <Form.Label>Naziv testa</Form.Label>
            <Form.Control type="username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Vreme trajanja</Form.Label>
            <Form.Control/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sacuvaj
          </Button>
        </Form>
      </Container>


    )
  }
}

export default NewTest