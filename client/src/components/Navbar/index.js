import React from 'react';
import jwt from 'jsonwebtoken'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
} from './NavbarElements';
import { Dropdown } from 'react-bootstrap';

var token = localStorage.getItem('token');;
var LoggedInUser = jwt.decode(token);
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
          <NavLink to='/show-flight-list' activeStyle>
            All Flights
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

        {((token === null)) ? (  //User not logged in

          <NavBtn>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Account
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/login">Log in</Dropdown.Item>
                <Dropdown.Item href="/Registration">Register</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </NavBtn>

        ) : (  //Admin logged in

          ((LoggedInUser.username === 'Administrator')) ? (  //User not logged in

            <NavBtn>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
                  <Dropdown.Item href="/create-flight">Create Flight</Dropdown.Item>
                  <Dropdown.Item href="/admin-show-flight-list">Edit/Delete Flights</Dropdown.Item>
                  <Dropdown.Item href="/advanced-search">Flight Search</Dropdown.Item>
                  <Dropdown.Item href="/reserved-flights">Your Itinerary</Dropdown.Item>
                  <Dropdown.Item href="/account-security">Account Security</Dropdown.Item>
                  <Dropdown.Item href="/" onClick={function (event) { localStorage.removeItem("token"); window.location.assign('http://localhost:3000/') }}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </NavBtn>

          ) : (  //User logged in

            <NavBtn>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
                  <Dropdown.Item href="/reserved-flights">Your Itinerary</Dropdown.Item>
                  <Dropdown.Item href="/account-security">Account Security</Dropdown.Item>
                  <Dropdown.Item href="/" onClick={function (event) { localStorage.removeItem("token"); window.location.assign('http://localhost:3000/') }}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </NavBtn>

          )

        )}

      </Nav>
    </>
  );
};

export default Navbar;