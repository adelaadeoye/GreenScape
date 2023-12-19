// Importing necessary modules and assets
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, InputGroup, Row, Form, Image, Button } from "react-bootstrap";
import "../styles/signup.css";
import eye from "../assets/img/eye.svg";
import eyeClosed from "../assets/img/eye-crossed.svg";

// Styles object for inline styling
export const styles = {
  column: {
    margin: "0px auto",
    height: "100%",
  },
  buttonrow: {
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

// SignUp component function
function SignUp({paramValues}) {
  // Initializing navigation hook
  const navigate = useNavigate();

  // State variables for email and password input, error message, and eye icon state
  const [emailPassword, setEmailPassword] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    message: "",
    status: false,
  });
  const [eyeCrossed, setEyeCrossed] = useState(true);

  // Function to handle navigation to signup page
  const handleOnClick = () => navigate("/signup");

  // Function to handle sign in
  const handleSignIn = () => {
    const users = paramValues.users;
    const check = users.find(user => user.email === emailPassword.email && user.password === emailPassword.password);
    if (emailPassword.password !== "" && emailPassword.email !== "") {
      if (check) {
        paramValues.setCurrentUser(check);
        navigate("/business");
      } else {
        setError({
          message: "Invalid email or password or user does not exist",
          status: true,
        });
      }
    } else {
      setError({
        message: "Email and password required",
        status: true,
      });
    }
  };

  // Effect hook (currently empty)
  useEffect(() => {}, []);

  // JSX rendering
  return (
    <Container fluid className="h-100">
      {/* Sign In Form */}
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={4}>
          <div className="card">
            <div className="title">Sign In</div>
            
            {/* Email Input */}
            <label className="label">Email</label>
            <InputGroup style={styles.inputGroup}>
              <Form.Control
                className="inputWithoutBorder"
                type="email"
                value={emailPassword.email}
                onChange={(e) => {
                  setError({ message: "", status: false });
                  setEmailPassword({ ...emailPassword, email: e.target.value });
                }}
              />
            </InputGroup>
            
            {/* Password Input */}
            <label className="label">Password</label>
            <InputGroup style={styles.inputGroup}>
              <Form.Control
                className="inputWithoutBorder"
                type={eyeCrossed ? "password" : "text"}
                value={emailPassword.password}
                onChange={(e) => {
                  setError({ message: "", status: false });
                  setEmailPassword({ ...emailPassword, password: e.target.value });
                }}
              />
              
              {/* Eye icon to toggle password visibility */}
              <Image
                src={eyeCrossed ? eyeClosed : eye}
                alt="eye"
                width="30"
                height="30"
                style={{ marginTop: -20 }}
                onClick={() => setEyeCrossed(!eyeCrossed)}
              />
            </InputGroup>
            
            {/* Error message display */}
            {error.status && <p style={{ color: "red" }}>{error.message}</p>}
            
            {/* Sign In Button */}
            <Row style={styles.buttonrow}>
              <Col>
                <Button variant="success" className="signInButton" onClick={handleSignIn}>
                  SignIn
                </Button>
              </Col>
            </Row>
            
            {/* Signup link */}
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
