import React, { useState } from "react";
import { Modal, Row, Col, Image, Button } from "react-bootstrap";
import Cancel from "../assets/img/close.svg"
import "../styles/settings.css";
export default function Settings({paramValues,show,setShow}) {
	const [profile, setProfile] = useState({
		image: paramValues.currentUser.image?paramValues.currentUser.image:'',
		fName: paramValues.currentUser.fName?paramValues.currentUser.fName:'',
		lName: paramValues.currentUser.lName?paramValues.currentUser.lName:'',
		telephone:paramValues.currentUser.telephone?paramValues.currentUser.telephone:''
	});
	const isFileReaderBusy = () => {
		return !!document.querySelector('[data-file-reader-busy="true"]');
	};

	function handleImageUpload(e) {
		const file = e.target.files[0];

		// Check if the FileReader is busy before reading a new file
		if (!isFileReaderBusy()) {

			// Read the file as a data URL (Base64)
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfile({ ...profile, image: reader.result });
			};
			reader.readAsDataURL(file);
		}
	}
	const handleDone = () => {
        paramValues.setUsers((prevUsers) => {
          const updatedUserList = [...prevUsers];
          
          const userID = updatedUserList.findIndex(
            (user) => user.id === paramValues.currentUser.id
          );
      
          const updatedUser = { ...updatedUserList[userID] };
          updatedUser.image = profile.image;
          updatedUser.fName = profile.fName;
          updatedUser.lName = profile.lName;
          updatedUser.telephone = profile.telephone;
      
          updatedUserList[userID] = updatedUser;
      
          // Update the currentUser in paramValues immediately after updating the list
          paramValues.setCurrentUser(updatedUser);
      
          return updatedUserList;
        });
      
        // Log the updated currentUser after the state has been updated
        console.log(paramValues.currentUser);
      
        setShow(false);
      };
      
	
	return (
		<Modal
			show={show}
			onHide={() => setShow(true)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<Image src={Cancel} width={20} onClick={()=>setShow(false)}/>
				<Row className="settingContainer">
					<Col className="profileContainer">
						<Image src={profile.image} className="profilePicture"></Image>
						<input
							type="file"
							multiple={false}
							accept="image/*"
							onChange={handleImageUpload}
						/>
					</Col>
					<Col className="nameContainer">
						<label>First name:</label>{" "}
						<input
							type="text"
							value={profile.fName}
							onChange={(e) => {
								setProfile({ ...profile, fName: e.target.value });
							}}
						></input>
						<label style={{ marginLeft: 10 }}>Last name:</label>{" "}
						<input type="text" value={profile.lName} onChange={(e)=>{setProfile({...profile,lName:e.target.value})}}></input>
					</Col>

					<Col className="settingContainer">
						<label>Telephone</label>
						<input type="telephone" value={profile.telephone} onChange={(e)=>{setProfile({...profile,telephone:e.target.value})}}/>
					</Col>
					<Button variant="success" style={{ width: 100, marginTop: 10 }} onClick={handleDone}>
						Done
					</Button>
				</Row>
			</Modal.Body>
		</Modal>
	);
}
