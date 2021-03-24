import React, { Component } from 'react'
import MainMenu, { MainMenuItem } from '../MainMenu/MainMenu'

interface SpecificMainMenuProperties {
  case: "student" | "profesor" | "profesorQuestion" | "profesorAnswer"
  id: number  

}

export default class SpecificMainMenu extends React.Component<SpecificMainMenuProperties> {
 
  
 
  render(){

    let items:MainMenuItem[] = [];

    switch(this.props.case){
      case "student" : this.setMenuItemsStudent(); break; 
      case "profesor" : items = this.setMenuItemsProfesor(); break; 
      case "profesorQuestion" : this.setMenuItemsProfesorQ(); break; 
      case "profesorAnswer" : this.setMenuItemsProfesorA(); break; 
    }

    return (
        <MainMenu items = { items }></MainMenu>
    )

  }


  setMenuItemsStudent(){
    return[
      
    ]
  }
  setMenuItemsProfesor(){
    return [
      new MainMenuItem("Moji testovi",`/api/profesor/${this.props.id}/moji_testovi`),
      new MainMenuItem("Registracija studenta", `/api/profesor/${this.props.id}/registracija_studenta`),
      new MainMenuItem("Dodaj test", `/api/profesor/${this.props.id}/novi_test`)

    ]
  }
  setMenuItemsProfesorQ(){
    return [
      new MainMenuItem("Moji testovi","/api/profesor/:id/moji_testovi"),
      new MainMenuItem("Registracija studenta", "/api/profesor/:id/registracija_studenta"),
      new MainMenuItem("Dodaj pitanje", "/api/profesor/:id/test")
    ]
  }
  setMenuItemsProfesorA(){}
}
