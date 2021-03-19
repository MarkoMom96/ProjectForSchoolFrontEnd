import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.min.js"
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import { Banner } from "./components/AppBanner/banner";
import MainMenu, { MainMenuItem } from './components/MainMenu/MainMenu';
import { Login } from './components/Login/Login';
import TestList from './components/TestList/TestList';
import StudentRegistration from './components/StudentRegistration/StudentRegistration';
import NewTest from './components/NewTest/NewTest';
import { HashRouter, Route } from "react-router-dom";
import Switch from 'react-bootstrap/esm/Switch';
import EditTest from './components/EditTest/EditTest';
import { QuestionList } from './components/QuestionList/QuestionList';
import EditQuestion from './components/EditQuestion/EditQuestion';


export const user = "Marko Momcilovic";
const menuOptions = [
    new MainMenuItem("Moji testovi","/api/profesor/1/moji_testovi"),
    new MainMenuItem("Registracija studenta", "/api/profesor/1/registracija_studenta"),
    new MainMenuItem("Dodaj test", "/api/profesor/1/novi_test")

  ]; 

  



ReactDOM.render(
  <React.StrictMode>
    <Banner></Banner>
    <MainMenu items = { menuOptions }></MainMenu>
    <HashRouter>
      <Switch className = "p-0">
        <Route exact path = "/" component = { Login }/>
        <Route exact path = "/api/:role/:id/moji_testovi" component = { TestList }/>
        <Route exact path = "/api/:role/:id/registracija_studenta" component = { StudentRegistration }/>
        <Route exact path = "/api/:role/:id/novi_test" component = { NewTest }/>
        <Route exact path = "/api/:role/:id/test/:tId/izmeni" component = { EditTest }/>
        <Route exact path = "/api/:role/:id/test/:tId" component = { QuestionList }/>
        <Route exact path = "/api/:role/:id/test/:tId/pitanje/:qId/izmeni" component = { EditQuestion }/>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
