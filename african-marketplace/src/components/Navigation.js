import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <div className="nav-header">
        <p>African Marketplace</p>
        <ul id="nav">
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/registration">Register</Link>
          </li>
          <li>
            <Link to="/sell">Add Item</Link>
          </li>
          <li>
            <Link to="/home">All Items</Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default Navigation;
