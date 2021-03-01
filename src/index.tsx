import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
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



const menuOptions = [
    new MainMenuItem("Moji testovi", "/activni_testovi/"),
    new MainMenuItem("Registracija studenta", "/registracija_studenta/")
    
  ];  


ReactDOM.render(
  <React.StrictMode>
    <Banner></Banner>
    
    <Login></Login>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
