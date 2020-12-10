import React from "react";
import { Container } from "react-bootstrap";

export class Login extends React.Component {
    render() {
        return (
            <Container>
            <form>
                <div className="form-group">
                    <p>Prijavite se da bi ste koristili aplikaciju</p>
                    <label>Korisnicko ime</label>
                    <input type= "text" className="form-control" ></input>
                </div>
                <div className="form-group">
                    <label>Lozinka</label>
                    <input type= "password" className="form-control" width="50%"></input>
                
                </div>
                <div className="form-group">
                    <label htmlFor="RoleSelect">Prijavi se kao:</label>
                    <select className="form-control" id="RoleSelect">
                        <option>Student</option>
                        <option>Profesor</option>
                    </select>
                </div>
                <div className ="btn-group" role="group" >
                    <button type="submit" className="btn btn-primary">Prijavi se</button>
                    <button type="button" className="btn btn-secondary">Promeni lozinku</button>
                </div>
                

                


               {/*
                <div classNameName="from-check">
                    <input classNameName="form-check-input" type="radio" value="Studnet" id="radioBtn1" ></input>
                    <label className="form-check-label" htmlFor="radioBtn1">Student</label>
                </div>
                <div className="from-check">
                    <input className="form-check-input" type="radio" value="Profesor" id="radioBtn2"></input>
                    <label className="form-check-label" htmlFor="radioBtn2">Profesor</label>
                </div> */}
                
                
            </form>
            </Container>
        )
    }
}