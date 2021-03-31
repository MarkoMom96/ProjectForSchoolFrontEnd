import React from "react";
import { Redirect } from "react-router-dom";
import { removeData } from "../../api/api";


interface LogOutPageState {
  done: boolean
}
export default class LogOutPage extends React.Component {
  state: LogOutPageState

  constructor(props: Readonly<{}>) {
    super(props)

    this.state = {
      done: false
    }
  }


  render() {
    
     if(this.state.done === true ) {

      return(
        <Redirect to = "/"></Redirect>
      )
    } 
    return <p>Molimo sacekajte</p>
    
  }

  changeState() {
    this.setState({
      done : true
    })
  }

  doLogOut() {
    removeData()
    this.changeState()
   
    
  }
  componentDidMount() {
    this.doLogOut()
  }
 /*  componentDidUpdate() {
    this.doLogOut()
  } */
}
