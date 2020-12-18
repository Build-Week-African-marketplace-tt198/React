import React from "react";
import Registration from "./components/Registration";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./components/Navigation";

function App() {
  const StyledLink = styled(Link)`
    width: 100px;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    float: right;
    color: black;
  `;
  return (
    <div className="App">
      <Router>
        <div className="header-one">
          <Navigation />
        </div>

        <div className="welcome">
          <h4>Welcome! Please sign in to get started.</h4>
        </div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/registration" component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
