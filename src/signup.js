import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './css/Form.css'
import { signInwitGoogle,signin, authenticate, isAutheticated, signup } from "./Auth/helper";
import './css/Card.css'
import { Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import NavBar from "./NavBar";


const Signup = () => {
  const [values, setValues] = useState({
      name:"",
    email: "",
    password: "",
    confirmPassword:'',
    error: "",
    loading: false,
    success:false,
    didRedirect: false
  });

  const { name,email, password,confirmPassword, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    console.log(confirmPassword)
    if( confirmPassword==''){
        setValues({...values,error:'Please Confirm Password',loading:false,success:false})
    }
    else{
        setValues({ ...values, error: false, loading: true });
        signup({ name,email, password })
          .then(data => {
            if (data.error) {
                console.log(data.error)
              setValues({ ...values, error: data.error, loading: false,success:false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword:"",
                    error: "",
                    success: true
                  });
            }
          })
          .catch(err=>{
              setValues({...values,error:"Sign Up Failed",loading:false})
          });
    }
  };

  const performRedirect = () => {


    if (didRedirect) {
      if (user) {
        return <p><Redirect to="/signin" /></p>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/signin" />;
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
            <h2 style={{color:'#f1f1f1'}}>{error.toString().toLocaleUpperCase()}</h2>
        </div>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
  
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: values.success ? "" : "none" }}
          >
            
            <div className="loader">
            <h2 style={{color:'#f1f1f1'}}>SIGN UP SUCCESSFULL LOGIN <a href="/signin" >HERE</a></h2>
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
          <h1>Sign Up</h1>
          <input onChange={handleChange("name")}
                value={values.name}
                className="form-control"
                placeholder="Name"
                type="text" />
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
                <input  onChange={handleChange("confirmPassword")}
                value={values.confirmPassword}
                className="form-control"
                type="password"
                placeholder='Confirm Password'
                />
          <input type="submit" onClick={onSubmit} name="" value="Sign Up" />
          <a href="/signin" style={{color:"#f1f1f1",textDecoration:"none"}} >Sign In here</a>
          {successMessage()}
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

export default Signup;
