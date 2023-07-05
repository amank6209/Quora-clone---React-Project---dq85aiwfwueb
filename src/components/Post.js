import React, { useEffect } from 'react';
import { useState } from "react";
import { Avatar } from '@material-ui/core';
import "./css/QuoraHeader.css";
//import Modal from "react-responsive-modal";
import { Close } from "@material-ui/icons";
// import ReactQuill from 'react-quill';

import "./css/Post.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionId, selectQuestionName, setQuestionInfo } from '../features/questionSlice';
import db from '../firebase';
import { selectUser } from '../features/userSlice';
import firebase from "firebase";


function Post({ id, question, image, timestamp, quoraUser }) {

    const user = useSelector(selectUser)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const close = (<Close />)
    const questionId = useSelector(selectQuestionId);
    const questionName = useSelector(selectQuestionName)
    const [answer, setAnswer] = useState("");
    const [getAnswer, setGetAnswer] = useState([])

    useEffect(() => {
        if (id) {
            db.collection("questions")
                .doc(id)
                .collection("answer")
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot =>
                    setGetAnswer(
                        snapshot.docs.map((doc) => (
                            {
                                id: doc.id,
                                answer: doc.data()
                            })))
                );
        }
    }, []);

    const handleAnswer = (e) => {
        e.preventDefault()

        if (questionId) {
            db.collection('questions').doc(questionId).collection('answer').add({
                questionId: questionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                answer: answer,
                user: user,
            });
        }
        console.log(questionId, questionName);
        setAnswer("");
        setIsModalOpen(false);
    };

    return (
        <div className='post'
            onClick={() => dispatch(setQuestionInfo({
                questionId: id,
                questionName: question,
            })
            )
            }
        >
            <div className='post-info'>
                <Avatar
                    src={quoraUser.photo}
                />
                <h4>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h4>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className='post-contain'>
                <div className="post-question">
                    <p>{question}</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='post-ans-btn'>
                        Answer
                    </button>

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
                        <div className="modal-qustion">
                            <h1>{question}</h1>
                            <p>
                                asked by <span className="name">{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</span> {" "} on
                                {" "}<span className="name">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>
                        <div className="modal-answer">

                            {/* <ReactQuill */}
                            <textarea
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                placeholder="Enter your answer" type="text" />
                        </div>
                        <div className="modal-buttons">
                            <button type="sumbit" onClick={handleAnswer} className="add">
                                Add Answer
                            </button>
                            <button className="cancel" onClick={() => setIsModalOpen(false)}>
                                cancel
                            </button>

                        </div>
                    </Modal>
                </div>

            </div>

            <div className="img">
                <img src={image} alt="" />
            </div>

            <div className='post-ans'>

                {getAnswer.map(({ id, answer }) => (
                    <p key={id}
                        style={{
                            position: "relative",
                            paddingBottom: "5px"
                        }}>
                        {(
                            <span>
                                {answer.answer}
                                <br />
                                <span
                                    style={{
                                        position: "absolute",
                                        color: "gray",
                                        fontSize: "small",
                                        display: "flex",
                                        right: "0px",
                                    }}
                                >
                                    <span style={{
                                        color: "grey",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    }}>
                                        {answer.user.displayName
                                            ? answer.user.displayName
                                            : answer.user.email}{" "}
                                        on{" "}
                                        {new Date(answer.timestamp?.toDate()).toLocaleString()}
                                    </span>
                                </span>
                            </span>
                        )}
                    </p>
                ))}

            </div>

        </div>
    );
}

export default Post;

