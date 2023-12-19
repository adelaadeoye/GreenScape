import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Image } from "react-bootstrap";
import "../styles/business.css";
import moment from "moment";
export default function Business({ paramValues }) {
  const getStarRating = (averageRating) => {
    const roundedRating = Math.round(averageRating);
    const starRating = "⭐️ ".repeat(roundedRating);
    return starRating;
  };

  const [show, setShow] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [userReview, setUserReview] = useState({
    review: "",
    rating: "",
    donation: "",
  });

  const [businessList, setBusinessList] = useState(paramValues.business);
  const handleShow = (item, averageRating) => {
    item.averageRating = averageRating;
    setSelectedBusiness(item);
    setShow(true);
  };

  const handleSend = () => {
    setBusinessList((prevBusinessList) => {
      const updatedBusinessList = [...prevBusinessList];

      const businessIndex = updatedBusinessList.findIndex(
        (business) => business.id === selectedBusiness.id
      );

      const updatedBusiness = { ...updatedBusinessList[businessIndex] };
      updatedBusiness.businessReviews.push({
        reviewerName: "Sophie Carter",
        reviewerComment: userReview.review,
        reviewerRating: parseInt(userReview.rating)>0?parseInt(userReview.rating):0,
        reviewerDonation: parseInt(userReview.donation)>0?parseInt(userReview.donation):0,
        reviewDate: moment().format(""),
      });
      updatedBusinessList[businessIndex] = updatedBusiness;

      return updatedBusinessList;
    });

    setUserReview({
      review: "",
      rating: "",
      donation: "",
    });

    setShow(false);
    paramValues.setBusinesses(businessList)
  };

  const handleInput = (e, type) => {
    setUserReview({ ...userReview, [type]: e.target.value });
  };

 
  return (
    <>
      {selectedBusiness !== "" && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedBusiness.businessName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <p> {selectedBusiness.businessDescription}</p>
            <p>Viewer Ratings: {selectedBusiness.averageRating}</p>
            <p> Total Donations: ${selectedBusiness.totalDonation}</p>
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
          <Modal.Footer>
            <Button variant="primary" onClick={handleSend}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
