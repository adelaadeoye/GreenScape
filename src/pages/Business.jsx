import React from "react";
import { Card, Row, Col } from "react-bootstrap";
export default function Business({ paramValues }) {
  return (
      <Row>
        {paramValues.business.map((business) => {
          return (
            <Col md={3} style={{marginTop:-70, marginBottom:20}} key={business.id}>
              <Card  >
                <Card.Img variant="top" src={business.businessImage} />
                <Card.Title style={{ marginTop:0}}>{business.businessName}</Card.Title>
                <Card.Body style={{ marginTop:-30, padding:0}}>
                  <Card.Text>
                    {business.businessDescription.slice(0,Math.floor(Math.random() * (150 - 50)) + 50)}...
                  </Card.Text>
                  <Card.Subtitle>Reviews: {business.businessReviews.length} Ratings:</Card.Subtitle>
                  <p>See more</p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
  );
}
