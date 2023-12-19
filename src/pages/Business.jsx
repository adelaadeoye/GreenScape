// Importing necessary modules and styles
import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Image } from "react-bootstrap";
import "../styles/business.css";
import moment from "moment";

// Business component function
export default function Business({ paramValues }) {
  // Function to get star ratings based on the average rating
  const getStarRating = (averageRating) => {
    const roundedRating = Math.round(averageRating);
    const starRating = "⭐️ ".repeat(roundedRating);
    return starRating;
  };

  // State variables for modal control and user review input
  const [show, setShow] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [userReview, setUserReview] = useState({
    review: "",
    rating: "",
    donation: "",
  });

  // State variable for the list of businesses
  const [businessList, setBusinessList] = useState(paramValues.business);

  // Function to handle modal display
  const handleShow = (item, averageRating) => {
    item.averageRating = averageRating;
    setSelectedBusiness(item);
    setShow(true);
  };

  // Function to handle review submission
  const handleSend = () => {
    if (userReview.review === "" && userReview.rating === "" && userReview.donation === "") {
      setShow(false);
    } else {
      // Update business list with the new review
      setBusinessList((prevBusinessList) => {
        const updatedBusinessList = [...prevBusinessList];
        const businessIndex = updatedBusinessList.findIndex(
          (business) => business.id === selectedBusiness.id
        );
        const updatedBusiness = { ...updatedBusinessList[businessIndex] };
        updatedBusiness.businessReviews.push({
          reviewerName: paramValues.currentUser.email,
          reviewerComment: userReview.review,
          reviewerRating: parseInt(userReview.rating) > 0 ? parseInt(userReview.rating) : 0,
          reviewerDonation: parseInt(userReview.donation) > 0 ? parseInt(userReview.donation) : 0,
          reviewDate: moment().format(""),
        });
        updatedBusinessList[businessIndex] = updatedBusiness;
        return updatedBusinessList;
      });

      // Clear user review input and close the modal
      setUserReview({
        review: "",
        rating: "",
        donation: "",
      });
      setShow(false);
      
      // Update businesses in parent component
      paramValues.setBusinesses(businessList);
    }
  };

  // Function to handle input changes in the user review form
  const handleInput = (e, type) => {
    setUserReview({ ...userReview, [type]: e.target.value });
  };

  // JSX rendering
  return (
    <>
      {/* Modal for displaying business details and reviews */}
      {selectedBusiness !== "" && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* Modal Header */}
          <Modal.Header closeButton>
            <Modal.Title>{selectedBusiness.businessName}</Modal.Title>
          </Modal.Header>
          
          {/* Modal Body */}
          <Modal.Body>
            {/* Business Image */}
            <Image
              src={selectedBusiness.businessImage}
              style={{
                margin: "0px auto",
                display: "flex",
                marginBottom: "10px",
                maxWidth: 350,
              }}
              alt={selectedBusiness.businessName}
            />
            {/* Business Description */}
            <p>{selectedBusiness.businessDescription}</p>
            {/* Business Details: Ratings and Total Donations */}
            <p>Viewer Ratings: {selectedBusiness.averageRating}</p>
            <p>Total Donations: ${selectedBusiness.totalDonation}</p>
            
            {/* User Review Input: Rating and Donation */}
            Your rating (eg 1-5):{" "}
            <input
              type="number"
              max={5}
              min={0}
              value={userReview.rating}
              onChange={(e) => {
                const newValue = Math.min(5, Math.max(0, e.target.value));
                handleInput({ target: { value: newValue } }, "rating");
              }}
            />
            Your donation (Max $50) ${" "}
            <input
              type="number"
              max={50}
              min={0}
              value={userReview.donation}
              onChange={(e) => {
                const newValue = Math.min(50, Math.max(0, e.target.value));
                handleInput({ target: { value: newValue } }, "donation");
              }}
            />
            
            {/* Displaying existing reviews */}
            <h5 className="textP"> Reviews </h5>
            <div style={{ maxHeight: 200, overflow: "auto", marginBottom: 40 }}>
              {selectedBusiness.businessReviews.map((review) => {
                return (
                  <div
                    style={{ borderBottom: "0.5px solid grey", marginTop: 10 }}
                    key={
                      review.reviewDate
                        ? review.reviewDate
                        : moment(new Date()).format("DD-MM-yyyy h:mm a")
                    }
                  >
                    <p className="textP">{review.reviewerComment}</p>
                    <p className="textP">
                      By: {review.reviewerName}
                      <br></br>
                      <i>
                        {review.reviewDate
                          ?moment(review.reviewDate).format("DD-MM-yyyy h:mm a") 
                          : moment(new Date()).format("DD-MM-yyyy h:mm a")}
                      </i>
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Textarea for user to input new review */}
            <div>
              <textarea
                rows="3"
                cols="50"
                maxLength="200"
                style={{border: "1px solid grey", }}
                className="inputWithoutBorder"
                placeholder="Please drop a review..."
                value={userReview.review}
                onChange={(e) => {
                  handleInput(e, "review");
                }}
              />
            </div>
          </Modal.Body>
          
          {/* Modal Footer */}
          <Modal.Footer>
            <Button variant="primary" onClick={handleSend}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
      {/* Displaying a list of businesses */}
      <Row>
        {businessList.map((business) => {
          const totalRating = business.businessReviews.reduce(
            (sum, review) => sum + review.reviewerRating,
            0
          );
          const totalDonation = business.businessReviews.reduce(
            (sum, review) => sum + review.reviewerDonation,
            0
          );
          const averageRating =
            totalRating / business.businessReviews.length || 0;
          business.totalDonation = totalDonation;
          return (
            <Col md={3} className="cardContainer" key={business.id}>
              <Card>
                {/* Business Card */}
                <Card.Img
                  variant="top"
                  src={business.businessImage}
                  className="cardImage"
                />
                <Card.Title>{business.businessName}</Card.Title>
                <Card.Body className="cardBody">
                  <Card.Text>
                    {business.businessDescription.slice(0, 150)}
                    ...
                  </Card.Text>
                  <Card.Subtitle style={{ marginBottom: 10 }}>
                    Reviews: {business.businessReviews.length}
                  </Card.Subtitle>
                  <Card.Subtitle style={{ marginBottom: 10 }}>
                    Ratings: {getStarRating(averageRating)}
                  </Card.Subtitle>
                  {/* "See more" link to show business details in modal */}
                  <p
                    className="seeMore"
                    onClick={() =>
                      handleShow(business, getStarRating(averageRating))
                    }
                  >
                    See more
                  </p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
