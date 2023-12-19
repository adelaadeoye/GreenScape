import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { Container, } from "react-bootstrap";
import LandingPage from "./pages/LandingPage";
import NavContainer from "./components/NavContainer";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import user from "./db/users.json"
import business from "./db/business.json"
import Business from "./pages/Business";
const createHistory = require("history").createBrowserHistory;
function App() {
  const [users,setUsers]= useState(user)
  const [currentUser,setCurrentUser]= useState("")
const [businesses,setBusinesses]= useState(business)
  const paramValues ={
    users: users,
    setUsers: setUsers,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    business: businesses,
    setBusinesses:setBusinesses
  }
  
  return (
    <BrowserRouter history={createHistory}>
        <NavContainer paramValues={paramValues} />
      <Container fluid className="App h-100 d-flex flex-column">
        <Routes>
          <Route path="/" element={<LandingPage  paramValues={paramValues}/>} />
          <Route path="/signup" element={<SignUp paramValues={paramValues}/>} />
          <Route path="/signin" element={<SignIn paramValues={paramValues}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/business" element={<Business paramValues={paramValues}/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
