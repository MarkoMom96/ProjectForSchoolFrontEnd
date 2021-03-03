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
import MainContent, { TestItem } from './components/MainContent/MainContent';
import StudentRegistration from './components/StudentRegistration/StudentRegistration';
import NewTest from './components/NewTest/NewTest';


export const user = "Marko Momcilovic";
const menuOptions = [
    new MainMenuItem("Moji testovi", "/moji_testovi/"),
    new MainMenuItem("Registracija studenta", "/registracija_studenta/"),
    new MainMenuItem("Novi test", "/novi_test/")

  ]; 

  const testList = [
    new TestItem("Test br1", "15", "30"),
    new TestItem("Test br2", "60", "90"),
    new TestItem("Test br3", "15", "10"),
    new TestItem("Test br4", "100", "90"),
    new TestItem("Test br5", "100", "90")
  ];
  /*
  <MainMenu items = { menuOptions }></MainMenu>
    <MainContent items = { testList }></MainContent>
  */


ReactDOM.render(
  <React.StrictMode>
    <Banner></Banner>
    <MainMenu items = { menuOptions }></MainMenu>
    <NewTest></NewTest>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
