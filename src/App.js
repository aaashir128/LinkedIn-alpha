import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MenuOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Widgets from "./components/Widgets/Widgets";
import { auth } from "./config/firebase";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./pages/Login";

function App() {
  const [navToggle, setNavToggle] = useState(false);
  const [widgetsToggle, setWidgetsToggle] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, []);
  console.log("this is User >>>", user);
  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <div className="sidebar__hamburgerMenu">
            <IconButton onClick={() => setNavToggle(!navToggle)}>
              {!navToggle ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </div>
          <Sidebar navToggle={navToggle} />
          <Feed />
          <Widgets widgetsToggle={widgetsToggle} />
          <div className="widgets__hamburgerMenu">
            <IconButton onClick={() => setWidgetsToggle(!widgetsToggle)}>
              {!widgetsToggle ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
