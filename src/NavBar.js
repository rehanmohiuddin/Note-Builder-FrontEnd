import React, { useEffect, useState, Fragment } from "react";
import "./css/Nav.css";
import { isAutheticated, signout } from "./Auth/helper";
import { MDBNavLink } from "mdbreact";
import { Link,Redirect, withRouter } from "react-router-dom";

function NavBar(props) {
  const [show, handleShow] = useState(false);

 const handleClick = () => {
    signout(()=>{props.history.push("/signin")})
}
const handleClickSignUp = () => {
    signout(()=>{props.history.push("/signup")})
}




  return (
    <div  className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={require('./Assets/log.png')}
        alt="Logo"
      />

   <div className="nav__avatar">

       
 
 

      

{isAutheticated() && ( <li className="nav-item">
     <span className="nav-link text-warning"
    onClick={handleClick}
     >
       Sign out
       
     </span>
      </li>) }
   </div>

    </div>
  );
}

export default withRouter(NavBar);
