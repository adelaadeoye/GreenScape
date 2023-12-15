import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import"../styles/business.css";
export default function Business({ paramValues }) {
	const getStarRating = (averageRating) => {
		const roundedRating = Math.round(averageRating);
		const starRating = '⭐️ '.repeat(roundedRating);
		return starRating;
		};
	return (
		<Row>
			{paramValues.business.map((business) => {
				const totalRating = business.businessReviews.reduce((sum, review) => sum + review.reviewerRating, 0);
				const averageRating = totalRating / business.businessReviews.length || 0;

				return (
					<Col md={3} className="cardContainer" key={business.id}>
						<Card >
							<Card.Img variant="top" src={business.businessImage} className="cardImage" />
							<Card.Title>{business.businessName}</Card.Title>
							<Card.Body className="cardBody">
								<Card.Text>
									{business.businessDescription.slice(0,Math.floor(Math.random() * (150 - 50)) + 50)}...
								</Card.Text>
								<Card.Subtitle style={{marginBottom:10}}>Reviews: {business.businessReviews.length}</Card.Subtitle>
								<Card.Subtitle style={{marginBottom:10}}>Ratings: {getStarRating(averageRating)}</Card.Subtitle>
								<p className="seeMore">See more</p>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}
