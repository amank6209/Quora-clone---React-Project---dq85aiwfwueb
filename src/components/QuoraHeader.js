import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import { Avatar, Input } from "@material-ui/core";
import "./css/QuoraHeader.css";
import {Modal} from "react-responsive-modal";
import { Close,PeopleAltOutlined } from "@material-ui/icons";

import "react-responsive-modal/styles.css";
import { ExpandMore } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import firebase from "firebase"

function QuoraHeader({ onSearch }) {

       const user = useSelector(selectUser);
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [inputUrl, setInputUrl] = useState("");
       const close = (<Close />)
       const [input, setInput] = useState(" ");

       const [query, setQuery] = useState('');

       const handleInputChange = event => {
              onSearch(event.target.value);
       };

       const handleQuestion = (e) => {
              e.preventDefault();

              setIsModalOpen(false);

              db.collection("questions").add({
                     question: input,
                     imageUrl: inputUrl,
                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                     user: user,
              });
              setInput("");
              setInputUrl("");
       };

       return (
              <div className="qHeader">
                     <div className="qHeaderContent">
                            <div className="qHeaderLogo">
                                   <img src="https://qph.fs.quoracdn.net/main-qimg-1d555094115465d668fe6d4ca59ec745" alt="logo" />
                            </div>

                            <div className="qHeaderInput">
                                   <input type="text" placeholder="Serach Qustions.." onBlur={handleInputChange} />
                                   <div class="searchbtn">
                                          <SearchIcon />
                                   </div>
                            </div>

                            <div className="qHeaderRem">
                                   <Avatar src={user.photo} />
                            </div>

                            <button className="quoraQustionButton" onClick={() => setIsModalOpen(true)}>Add Qustion</button>

                            <button className="logoutButton" onClick={() => auth.signOut()}>Logout</button>

                            <Modal
                                   open={isModalOpen}
                                   closeIcon={close}
                                   onClose={() => setIsModalOpen(false)}
                                   closeOnEsc
                                   center
                                   closeOnOverlayClick={false}
                                   styles={{
                                          overlay: {
                                                 height: "auto",
                                          },
                                   }}
                            >
                                   <div className="modal-title">
                                          <h5>Add Qustion</h5>
                                          <h5>Share Link</h5>
                                   </div>
                                   <div className="modal-info">
                                          <Avatar className="avatar" src={user.photo} />
                                          <p>{user.displayName ? user.displayName : user.email}</p>

                                          <div className="modal-scop">
                                                 <PeopleAltOutlined />
                                                 <p>Public</p>
                                                 <ExpandMore />
                                          </div>
                                   </div>
                                   <div className="modal-feild">
                                          <Input
                                                 required
                                                 id="name"
                                                 value={input}
                                                 onChange={(e) => setInput(e.target.value)}
                                                 type="text"
                                                 placeholder="Start your qustion with 'What', 'How', 'Why', etc."
                                          />
                                          <div style={{
                                                 display: "flex",
                                                 flexDirection: "column"
                                          }}>
                                                 <input
                                                        value={inputUrl}
                                                        onChange={(e) => setInputUrl(e.target.value)}
                                                        style={{
                                                               margin: "5px 0",
                                                               border: "1px solid lightgray",
                                                               padding: "10px",
                                                               outline: "2px solid #000",
                                                        }}
                                                        type="text"
                                                        placeholder="Optional: include a link that gives context"
                                                 />
                                                 {inputUrl !== "" && <img
                                                        style={{
                                                               height: "30vh",
                                                               objectFit: "contain",
                                                        }}
                                                        src={inputUrl} alt="display-image" />}

                                          </div>
                                   </div>
                                   <div className="modal-buttons">

                                          <button onClick={handleQuestion} type="submit" className="add">
                                                 Add Qustion </button>

                                          <button className="cancel" onClick={() => setIsModalOpen(false)}>
                                                 cancel </button>
                                   </div>
                            </Modal>

                     </div>
              </div>
       );
}

export default QuoraHeader;

