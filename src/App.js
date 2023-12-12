import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container,Row } from 'react-bootstrap';

const createHistory = require("history").createBrowserHistory;

function App() {
  return (
    <BrowserRouter history={createHistory}>
    <Container fluid className="App h-100 d-flex flex-column">
      
      <Row className="h-100">
        <Routes>
          <Route path="/" element={<h2 >Welcome</h2>} />
          
          
          
        </Routes>
      </Row>
    </Container>
  </BrowserRouter>
  );
}

export default App;
