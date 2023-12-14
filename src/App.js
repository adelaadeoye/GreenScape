import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import LandingPage from "./pages/LandingPage";
import NavContainer from "./components/NavContainer";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
const createHistory = require("history").createBrowserHistory;

function App() {
  return (
    <BrowserRouter history={createHistory}>
        <NavContainer />
      <Container fluid className="App h-100 d-flex flex-column">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
