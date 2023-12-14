import React from "react";
import { Container, Navbar, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function NavContainer() {
	const navigate = useNavigate();

	return (
		<>
			<Navbar className="navbar navbar-expand-md" style={{ height: "80px" }}>
				<Container fluid>
					<Navbar.Brand className="brand" style={{color:'white', fontSize:30, }} onClick={() => navigate("/")}>
						GreenScape
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
				</Container>
			</Navbar>
		</>
	);
}

export default NavContainer;
