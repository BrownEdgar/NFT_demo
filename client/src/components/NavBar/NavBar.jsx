import React from "react";
import { NavLink } from 'react-router-dom'
import "./navbar.css";
const NavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add Product</NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-up"
              className={'nav__button'}>
              sign up
            </NavLink>
            <NavLink
              to="/sign-in"
              className={'nav__button'}>
              Login
            </NavLink>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
