import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";
import { login } from "../features/userSlice";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();

    if (!name) {
      return alert("Please enter a full name!");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profilePic: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          className="login__logo"
          src="https://escapethewolf.com/wp-content/uploads/2015/05/linkedin_logo.png"
          alt="clone"
        />

        <form>
          <input
            type="text"
            placeholder="Full name (required if registering)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profile pic URL (optional)"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginToApp}>Sign In</button>
        </form>

        <p>
          Not a member?{" "}
          <span className="login__register" onClick={register}>
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
