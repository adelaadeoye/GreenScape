import React from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import "../styles/landingPage.css";
import sustain from "../assets/img/sustain.jpg";
import responsible from "../assets/img/responsible.jpg";
export default function LandingPage() {
	return (<>
  <Row className="introduction">
			<Col md={6}>
				<div className="p-2 p-lg-5 textSection">
					<h1> Welcome to GreenScape </h1>{" "}
					<p>
						We are Connecting Eco-Conscious Consumers with Sustainable
						Businesses. At GreenScape, we believe in making sustainable choices
						easy for everyone. Discover and support local businesses committed
						to eco-friendly practices. Join us in creating a greener world
						together!
					</p>
					<Image src={responsible} alt="responsible" width={550} rounded />
				</div>
			</Col>

			<Col md={6}>
				<div className="p-2 p-lg-5 textSection">
					<Image
						src={sustain}
						alt="sustainable"
						rounded
						width={550}
						style={{ marginTop: 30 }}
					/>

					<div>
						Explore Featured Sustainable Businesses in:
						<ul>
							<li>Organic Cafés </li>
							<li>Eco-Friendly Retailers </li>
							<li>Renewable Energy Providers</li>
							<li>Green Tech Innovators</li>
						</ul>
						<p>Sign up today and be part of the GreenScape community. Connect with
						like-minded individuals, share your experiences, and support
						businesses that are making a positive impact on the environment.</p>
            <Button variant="success" style={{width:"150px", borderRadius:20}}>Sign Up</Button>
					</div>
				</div>
			</Col>
		</Row>
    
  </>
		
    
	);
}
