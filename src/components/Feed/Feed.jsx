import { Article, Create, Panorama, Today, YouTube } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { selectUser } from "../../features/userSlice";
import "./Feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);
  const inputFile = useRef(null);
  const [imageInput, setImageInput] = useState(null);

  useEffect(() => {
    db.collection(`posts`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, [posts]);

  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      name: user?.displayName,
      description: user?.email || user?.status,
      message: input,
      photo: user.photoURL || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      image: imageInput,
    });
    setInput("");
  };

  const openFile = () => {
    inputFile.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageInput(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="feed">
      <div className="input__container">
        <div className="feed__input">
          <div className="feed__inputAvatar">
            <Avatar src={user?.photoURL} />
          </div>
          <form>
            <input
              placeholder="Start a post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost}>Send</button>
          </form>
        </div>

        <div className="feed__inputOption">
          <div onClick={openFile} on>
            <input
              type="file"
              // value={imageInput}
              onChange={handleChange}
              ref={inputFile}
              style={{ display: "none" }}
            />
            <InputOption Icon={Panorama} title="Photo" color="#7085f9" />
          </div>
          <InputOption Icon={YouTube} title="Video" color="#E7A33E" />
          <InputOption Icon={Today} title="Event" color="#c0cbcd" />
          <InputOption Icon={Article} title="Write article" color="#7fc15e" />
        </div>
      </div>

      <FlipMove>
        {posts.map((v, i) => (
          <Post
            key={v.id}
            id={v.id}
            name={v.data.name}
            description={v.data.description}
            message={v.data.message}
            timestamp={v.data.timestamp}
            photo={v.data.photo}
            image={v.data.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
