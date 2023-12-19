// Importing necessary modules and assets
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, InputGroup, Row, Form, Image, Button } from "react-bootstrap";
import "../styles/signup.css";
import eye from "../assets/img/eye.svg";
import close from "../assets/img/close.svg";
import eyeClosed from "../assets/img/eye-crossed.svg";

// Styles object for inline styling
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

// SignUp component function
function SignUp({paramValues}) {
	// Initializing navigation hook
	const navigate = useNavigate();

	// State variables for email and password input, eye icon state, and error message
	const [emailPassword, setEmailPassword] = useState({
		email: "",
		password: "",
	});
	const [eyeCrossed, setEyeCrossed] = useState(true);
	const [error, setError] = useState({
		message:"",
		status: false,
	});

	// Function to handle navigation to sign-in page
	const handleOnClick = () => navigate("/signin");

	// Function to handle sign-up
	const handleSignUp = () => {
		const users = paramValues.users;
		const check = users.some(user => user.email === emailPassword.email);
		
		// Find the maximum ID in the users array
        const maxId = Math.max(...users.map(user => user.id), 0);

        // Generate a new unique ID
        const newId = maxId + 1;

		if (emailPassword.password !== "" && emailPassword.email !== "") {
			if (check) {
				setError({
					message: "Email already exists",
					status: true
				});
			} else {
				// Creating a new user
                const newUser = { ...emailPassword, id: newId };
                const newUsers = [...users, newUser];
                
                // Updating current user and users state
                paramValues.setCurrentUser(newUser);
                paramValues.setUsers(newUsers);
                
                // Navigating to business page
                navigate("/business");
			}
		} else {
			setError({
				message: "Email and password are required",
				status: true
			});
		}
	};

	// JSX rendering
	return (
		<Container fluid className="h-100">
			{/* Sign Up Form */}
			<Row className="h-100 align-items-center justify-content-center">
				<Col md={4}>
					<div className="card">
						<div className="title">Sign Up</div>
						
						{/* Email Input */}
						<label className="label">Email</label>
						<InputGroup style={styles.inputGroup}>
							<Form.Control
								className="inputWithoutBorder"
								type="email"
								value={emailPassword.email}
								onChange={(e) => {
									setError({message:"", status: false});
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
									setError({message:"", status: false});
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
						{error.status && <p style={{color:"red"}}>{error.message}</p>}
						
						{/* Sign Up Button */}
						<Row style={styles.buttonrow}>
							<Col>
								<Button variant="success" className="signInButton" onClick={handleSignUp}>
									SignUp 
								</Button>
							</Col>
						</Row>
						
						{/* Sign In link */}
						<div>
							Already have an account
							<div className="account" onClick={handleOnClick}>
								Sign In
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default SignUp;
