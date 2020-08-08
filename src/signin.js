import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './css/Form.css'
import { signInwitGoogle,signin, authenticate, isAutheticated } from "./Auth/helper";
import './css/Card.css'
import { Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import NavBar from "./NavBar";


const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch( err=>{
        setValues({ ...values, error: "Sign In Failed", loading: false })
      });
  };

  const performRedirect = () => {

    //TODO
    if (didRedirect) {
      if (user) {
        return <p><Redirect to="/" /></p>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

 const loadingMessage = () => {
    return (
      loading && (
        <Popup
        open={true}
        modal
        contentStyle={{width:"300px",height:"200px",  borderRadius: "15px",
        overflow: 'hidden',
        perspective: "1px"}}
      >
        <div className="loader">
            <img src={require('./Assets/Infinity-1s-200px.gif')} />
            <h2>Please Wait...</h2>
        </div>
      </Popup>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            
            <div className="loader">
            <img style={{width:"100px",height:"100px"}} src={require('./Assets/error.png')} />
            <h2 style={{color:'#f1f1f1'}}>   {error.toString().toLocaleUpperCase()}</h2>
        </div>
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
        <MDBContainer>
              <NavBar />
        <form className="box">
          <h1>Login</h1>
      
          <input onChange={handleChange("email")}
                value={email}
                className="form-control"
                placeholder="E-Mail"
                type="email" />
          <input  onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
                placeholder='Password'
                />
          <input type="submit" onClick={onSubmit} name="" value="Login" />
          
            <a href="/signup" style={{color:"#f1f1f1",textDecoration:"none"}} >Sign Up here</a>

               
          {errorMessage()}
        </form>
        </MDBContainer>
    );
  };

  return (

    <div>
          {loadingMessage()}
  
      {signInForm()}
      {performRedirect()}
   
    </div>

  );
};

export default Signin;
