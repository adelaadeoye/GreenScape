import React from "react";
import { Button, Container, Navbar, Row } from "react-bootstrap";


function NavContainer() {
 


  return (
    <>
      <Navbar className="navbar navbar-expand-md" style={{ height: "80px" }}>
        <Container fluid>
          <Navbar.Brand  style={{color:'white', fontSize:30}}>
            GreenScape
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
}

export default NavContainer;
