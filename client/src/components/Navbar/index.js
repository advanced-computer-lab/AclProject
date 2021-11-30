import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
} from './NavbarElements';
import { Dropdown } from 'react-bootstrap';

var token = localStorage.getItem('token');;
var Navbar;


  Navbar = () => {
    return (
      <>
        <Nav>
          <NavLink to='/'>
            <img src={require('../../logo.svg').default} alt='mySvgImage' width="40" height="40" />
          </NavLink>

          <Bars />
          <NavMenu>
            <NavLink to='/about' activeStyle>
              Flight Search
            </NavLink>
            <NavLink to='/about' activeStyle>
              About
            </NavLink>
            <NavLink to='/services' activeStyle>
              Services
            </NavLink>
            <NavLink to='/contact-us' activeStyle>
              Contact Us
            </NavLink>
            {/* <NavLink to='/sign-up' activeStyle>
              Sign Up
            </NavLink> */}
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>

          {((token === null)) ? (

            <NavBtn>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/login">Log in</Dropdown.Item>
                  <Dropdown.Item href="/Registration">Register</Dropdown.Item>
                  {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </NavBtn>

          ) : (

            <NavBtn>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/" onClick={function(event){localStorage.removeItem("token"); window.location.assign('http://localhost:3000/')}}>Log out</Dropdown.Item>
                  {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </NavBtn>

          )}

        </Nav>
      </>
    );
  };

export default Navbar;