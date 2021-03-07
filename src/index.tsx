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


export const user = "Marko Momcilovic";
const menuOptions = [
    new MainMenuItem("Moji testovi","/profesor/1/moji_testovi"),
    new MainMenuItem("Registracija studenta", "/profesor/1/registracija_studenta"),
    new MainMenuItem("Dodaj test", "/profesor/1/novi_test")

  ]; 

  

 

ReactDOM.render(
  <React.StrictMode>
    <Banner></Banner>
    <MainMenu items = { menuOptions }></MainMenu>   
    <HashRouter>
      <Switch className = "p-0">
        <Route exact path = "/" component = {Login}/>
        <Route exact path = "/profesor/:pId/moji_testovi" component = { TestList }/>
        <Route exact path = "/profesor/:pId/registracija_studenta" component = { StudentRegistration }/>
        <Route exact path = "/profesor/:pId/novi_test" component = { NewTest }/>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
