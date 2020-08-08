import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signin from "./signin";
import Signup from "./signup";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
      
        
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;