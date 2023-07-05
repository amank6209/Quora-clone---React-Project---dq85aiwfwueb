import React, { useEffect, useState } from "react";
import QuoraHeader from "./QuoraHeader";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import "./css/Quora.css";
import db from "../firebase";

function Quora() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('questions')
      .orderBy('timestamp', "desc")
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map((doc) => (({
            id: doc.id,
            question: doc.data()
          })))))

  }, [])

  const handleSearch = query => {
    console.log(posts);
    if (query) {
      const filteredPosts = posts.filter(post => post.question.question.includes(query));
      setPosts(filteredPosts);
    }
  };


  return (
    <div className="quora">
      <QuoraHeader onSearch={handleSearch} />
      <div className="main-content">
        <div className="first-content">
          <Sidebar />
          <Feed posts={posts} />
          <Widget />
        </div>
      </div>

    </div>
  );
}

export default Quora;
