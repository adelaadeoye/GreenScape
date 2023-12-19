import React, { useState,useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";
import Settings from "./Settings";

function NavContainer({ paramValues }) {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
useEffect(() => {
  if(paramValues.currentUser==="" &&(!location.pathname.includes("/signin")||location.pathname.includes("/signup"))) {
    navigate("/")
  }
}, [paramValues])

  return (
    <>
    <Settings paramValues={paramValues} show={show} setShow={setShow}/>
      <Navbar className="navbar navbar-expand-md" style={{ height: "80px" }}>
        <Container fluid>
          <Navbar.Brand
            className="brand"
            style={{ color: "white", fontSize: 30 }}
            onClick={() => navigate("/")}
          >
            GreenScape
          </Navbar.Brand>
          {paramValues.currentUser.email ? (
            <Navbar.Brand className="brand" style={{ color: "white" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  border: "2px solid white",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setShowSettings(!showSettings);
                }}
              >
                {paramValues.currentUser.email.charAt(0).toUpperCase()}
                <div
                  className="dropdown"
                  style={{
                    display: showSettings ? "flex" : "none",
                    width: 200,
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    height: 100,
                    position: "absolute",
                    top: 70,
                    borderRadius: "5px",
                    right: 30,
                    padding: "5px",
                    paddingLeft: "10px",
                    fontWeight: "normal",
                    color: "black",
                    background: "white",
                  }}
                >
                  <p onClick={()=>setShow(true)}>Edit profile</p>
                  <p
                    onClick={() => {
                      paramValues.setCurrentUser("");
                      navigate("/");
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </Navbar.Brand>
          ):!location.pathname.includes("/signin")&&<Navbar.Brand style={{ color: "white", cursor:'pointer' }} onClick={()=>navigate("/signin")}>Sign In</Navbar.Brand>}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
}

export default NavContainer;
