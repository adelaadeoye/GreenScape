// Importing necessary modules and assets
import React from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import "../styles/landingPage.css";
import sustain from "../assets/img/sustain.jpg";
import responsible from "../assets/img/responsible.jpg";
import { useNavigate } from "react-router-dom";

// LandingPage component function
export default function LandingPage({paramValues}) {
  // Initializing navigation hook
  const navigate = useNavigate();

  // JSX rendering
  return (
    <>
      {/* Introduction Section */}
      <Row className="introduction">
        {/* Left Section with Text and Image */}
        <Col md={6}>
          <div className="p-2 p-lg-5 textSection">
            <div>
              {/* Welcome message and introduction */}
              <h1> Welcome to GreenScape </h1>
              <p>
                We are Connecting Eco-Conscious Consumers with Sustainable
                Businesses. At GreenScape, we believe in making sustainable
                choices easy for everyone. Discover and support local businesses
                committed to eco-friendly practices. Join us in creating a greener
                world together!
              </p>
            </div>
            {/* Image showcasing responsible practices */}
            <Image
              src={responsible}
              alt="responsible"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginTop: 30,
              }}
              rounded
            />
          </div>
        </Col>

        {/* Right Section with Image and Call to Action */}
        <Col md={6}>
          <div className="p-2 p-lg-5 textSection2">
            {/* Image showcasing sustainable practices */}
            <Image
              src={sustain}
              alt="sustainable"
              rounded
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginTop: 30,
              }}
            />

            <div style={{marginTop:10}}>
              {/* Featured Sustainable Businesses */}
              Explore Featured Sustainable Businesses in:
              <ul>
                <li>Organic Cafés </li>
                <li>Eco-Friendly Retailers </li>
                <li>Renewable Energy Providers</li>
                <li>Green Tech Innovators</li>
              </ul>
              
              {/* Call to Action and Signup/View Button */}
              <p>
                Sign up today and be part of the GreenScape community. Connect
                with like-minded individuals, share your experiences, and
                support businesses that are making a positive impact on the
                environment.
              </p>
               <Button
                variant="success"
                style={{ width: "150px", borderRadius: 20 }}
                onClick={()=>{navigate(paramValues.currentUser===""?"signup":"business")}}
              >
               {paramValues.currentUser===""? "Sign Up":"View"}
              </Button>
             
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
