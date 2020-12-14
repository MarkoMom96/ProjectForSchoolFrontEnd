import React from "react";

export class SideBar extends React.Component {
  render(){
    return(
      <nav>
        <ul className=" nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Moji testovi</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Odradjeni testovi</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Poruke</a>
          </li>
        </ul>
      

      </nav>
    )


  }
    

  
  
}