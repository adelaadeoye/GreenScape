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
function SignUp({paramValues}) {
  const navigate = useNavigate();
  const [emailPassword, setEmailPassword] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
		message:"",
		status: false,
	});


  const [eyeCrossed, setEyeCrossed] = useState(true);

  const handleOnClick = () => navigate("/signup");

  const handleSignIn = () => {
    const users = paramValues.users
    const check = users.find(user => user.email === emailPassword.email && user.password === emailPassword.password);
    if(emailPassword.password!=="" &&emailPassword.email!==""){
			if(check){
        paramValues.setCurrentUser(check)
        navigate("/business")
			}else{
        setError(
					{message:"invalid email or password or user does not exist",
					status:true}
				)
			}
		}else{
			setError(
				{message:"email and password required",
				status:true}
			)
		}
  };

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
                className="inputWithoutBorder"
                type="email"
                value={emailPassword.email}
                onChange={(e) =>{
									setError({message:"",
									status: false});
									setEmailPassword({ ...emailPassword, email: e.target.value })
								}}
              />
            </InputGroup>
            <label className="label">Password</label>
            <InputGroup style={styles.inputGroup}>
              <Form.Control
                className="inputWithoutBorder"
                type= {eyeCrossed?"password":"text"}
                value={emailPassword.password}
                onChange={(e) =>{
									setError({message:"",
									status: false});
									setEmailPassword({ ...emailPassword, password: e.target.value })
								}}
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
            {error.status &&<p style={{color:"red"}}>{error.message}</p>}

            <Row style={styles.buttonrow}>
          <Col>
            <Button variant="success" className="signInButton"onClick={handleSignIn}>
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
