import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const NavBarCustom = ({log}) => {
  
    const [isOpen, setIsOpen] = useState(false);


    function logout(){
      const token = localStorage.getItem('access')
      const body = 'String';
          axios.post('http://localhost:3000/logout',body,{
            headers:{
              'user':token
            }}
          ).then(result =>{
             localStorage.removeItem('access');
             window.location.reload();
          })
          .catch(err =>{
            console.log(err)
          })
    }
    
  return (
    <div>
      <Navbar color="faded" dark expand="md" fixed="top" className="navBarCustom">
        <NavbarBrand href="/" className="navBrand">9GAG</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="navItemCustom">
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">9GAG App</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">9GAG Shop</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">Meme</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">Local</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">Cosplay</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">Wholesome</NavLink>
            </NavItem>
            <NavItem className="navItemCustom">
              <NavLink href="https://github.com/reactstrap/reactstrap">Random</NavLink>
            </NavItem>
      }
          </Nav>>
              {
                log == true && (
                  <div>
                    <Button className="utilityButtons"href="/User">Usuario</Button>
                  <Button className="utilityButtons" onClick={logout}>Logout</Button>
                  <Button className="utilityButtons" href="/UploadPost">Upload</Button>
                  </div>
                )
              }

              {
                log == false &&(
                  <div>
                    <Button className="utilityButtons" href="/Login">Log in</Button>
      <Button className="utilityButtons" href="/SignUp">Sing Up</Button>
                  </div>
                )
              }

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarCustom;

