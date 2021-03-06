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
import { Login } from './components/Login/Login';
import TestList from './components/TestList/TestList';
import StudentRegistration from './components/StudentRegistration/StudentRegistration';
import NewTest from './components/NewTest/NewTest';
import { HashRouter, Route } from "react-router-dom";
import Switch from 'react-bootstrap/esm/Switch';
import EditTest from './components/EditTest/EditTest';
import { QuestionList } from './components/QuestionList/QuestionList';
import EditQuestion from './components/EditQuestion/EditQuestion';
import AnswerList from './components/AnswerList/AnswerList';
import EditAnswer from './components/EditAnswer/EditAnswer';
import FinishedTests from './components/FinishedTests/FinishedTests';
import  NewQuestion  from './components/NewQuestion/NewQuestion';
import NewAnswer from './components/NewAnswer/NewAnswer';
import ActiveTests from './components/ActiveTests/ActiveTests';
import  TestInProgress  from './components/TestInProgress/TestInProgress';
import LogOutPage from './components/LogOutPage/LogOutPage';


ReactDOM.render(
  <React.StrictMode>
    <Banner></Banner>
    <HashRouter>
      <Switch className = "p-0">
        <Route exact path = "/" component = { Login }/>
        <Route exact path = "/api/profesor/moji_testovi" component = { TestList }/>
        <Route exact path = "/api/profesor/registracija_studenta" component = { StudentRegistration }/>
        <Route exact path = "/api/profesor/novi_test" component = { NewTest }/>
        <Route exact path = "/api/profesor/test/:tId/izmeni" component = { EditTest }/>
        <Route exact path = "/api/profesor/test/:tId" component = { QuestionList }/>
        <Route exact path = "/api/profesor/test/:tId/novo_pitanje" component = { NewQuestion }/>
        <Route exact path = "/api/profesor/test/:tId/pitanje/:qId/izmeni" component = { EditQuestion }/>
        <Route exact path = "/api/profesor/test/:tId/pitanje/:qId/novi_odgovor" component = { NewAnswer }/>
        <Route exact path = "/api/profesor/test/:tId/pitanje/:qId/" component = { AnswerList }/>
        <Route exact path = "/api/profesor/test/:tId/pitanje/:qId/odgovor/:aId/izmeni" component = { EditAnswer }/>
        <Route exact path = "/api/student/moji_testovi/" component = { FinishedTests }/>
        <Route exact path = "/api/student/aktivni_testovi/" component = { ActiveTests }/>
        <Route exact path = "/api/student/test/:tId" component = { TestInProgress }/>
        <Route exact path = "/logout" component = { LogOutPage }/>

      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
