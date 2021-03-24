import React from 'react'
import MainMenu, { MainMenuItem } from '../MainMenu/MainMenu'

interface SpecificMainMenuProperties {
  case: "student" | "profesor" | "profesorQuestion" | "profesorAnswer"
  id: number
  tId?:number
  qId?: number

}

export default class SpecificMainMenu extends React.Component<SpecificMainMenuProperties> {
 
  
 
  render(){

    let items:MainMenuItem[] = [];

    switch(this.props.case){
      case "student"          : items = this.setMenuItemsStudent(); break; 
      case "profesor"         : items = this.setMenuItemsProfesor(); break; 
      case "profesorQuestion" : items = this.setMenuItemsProfesorQ(); break; 
      case "profesorAnswer"   : items = this.setMenuItemsProfesorA(); break; 
    }

    return (
        <MainMenu items = { items }></MainMenu>
    )

  }


  setMenuItemsStudent(){
    return[
      new MainMenuItem("Moji testovi",`/api/student/${this.props.id}/moji_testovi`),
      new MainMenuItem("Aktivni testovi",`/api/student/${this.props.id}/aktivni testovi`),
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
      new MainMenuItem("Moji testovi",`/api/profesor/${this.props.id}/moji_testovi`),
      new MainMenuItem("Registracija studenta", `/api/profesor/${this.props.id}/registracija_studenta`),
      new MainMenuItem("Dodaj pitanje", `/api/profesor/${this.props.id}/test/${this.props.tId}/novo_pitanje`)
    ]
  }
  setMenuItemsProfesorA(){
    return [
      new MainMenuItem("Moji testovi",`/api/profesor/${this.props.id}/moji_testovi`),
      new MainMenuItem("Registracija studenta", `/api/profesor/${this.props.id}/registracija_studenta`),
      new MainMenuItem("Dodaj odgovor", `/api/profesor/${this.props.id}/test/${this.props.tId}/pitanje/${this.props.qId}/novi_odgovor`)
    ]
  }
}
