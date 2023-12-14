import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, InputGroup, Row, Form, Image, Button } from "react-bootstrap";
import "../styles/signup.css";
import eye from "../assets/img/eye.svg";
import eyeClosed from "../assets/img/eye-crossed.svg";
export const styles = {
  column: {
    margin: "0px auto",
    height: "100%",
  },
  buttonrow: {
    // marginTop: "50px",
    gap: "10px",
  },
  checkmarkGreenIcon: {
    position: "relative",
    left: "0px",
  },
  eyeIcon: {
    position: "relative",
    right: "-10px",
    bottom: "-10px",
  },
  inputGroupText: {
    border: "none",
    background: "none",
  },
  inputGroup: {
    borderBottom: "1px solid #a4a8ad",
  },
};
function SignUp() {
  const navigate = useNavigate();
  const [emailPassword, setEmailPassword] = useState({
    email: "",
    password: "",
  });


  const [eyeCrossed, setEyeCrossed] = useState(true);

  const handleOnClick = () => navigate("/signup");

  const handleSignUp = () => {};

  useEffect(() => {}, []);

  return (
    <Container fluid className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={4}>
          <div className="card">
            <div className="title">Sign In</div>
            <label className="label">Email</label>
            <InputGroup style={styles.inputGroup}>
              <Form.Control
                className="input"
                type="email"
                value={emailPassword.email}
                onChange={(e) =>
                  setEmailPassword({ ...emailPassword, email: e.target.value })
                }
              />
            </InputGroup>
            <label className="label">Password</label>
            <InputGroup style={styles.inputGroup}>
              <Form.Control
                className="input"
                type= {eyeCrossed?"password":"text"}
                value={emailPassword.password}
                onChange={(e) =>
                  setEmailPassword({ ...emailPassword, password: e.target.value })
                }
              />

              <Image
                src={eyeCrossed ? eyeClosed : eye}
                alt="eye"
                width="30"
                height="30"
                style={{ marginTop: -20 }}
                onClick={()=>setEyeCrossed(!eyeCrossed)}
              />
            </InputGroup>
            <Row style={styles.buttonrow}>
          <Col>
            <Button variant="success" className="signInButton"onClick={handleSignUp}>
              SignIn
            </Button>
          </Col>
         
        </Row>
        <div>
        Don't have an account  
          <div className="account" onClick={handleOnClick}>
            SignUp
          </div>
        </div>
          </div>
        </Col>
        
      </Row>
     
    </Container>
  );
}

export default SignUp;
