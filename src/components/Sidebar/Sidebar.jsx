import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Sidebar.css";

function Sidebar({ navToggle }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className={`${navToggle ? "nav-toggler" : "sidebar"}`}>
      <div className="sidebar__top">
        <div className="sidebar__topUser">
          <img
            src="https://i.pinimg.com/736x/a6/93/bc/a693bc19fc5157db506951d0bc8fdc97.jpg"
            alt=""
          />
          <Avatar
            className="sidebar__profile"
            src={user?.photoURL}
            alt="profilePic"
          >
            {user?.displayName[0]}
          </Avatar>
          <h2>{user?.displayName}</h2>
          <h4>{user?.status || user?.email}</h4>
        </div>
        <hr />

        <div className="sidebar__stats">
          <div className="sidebar__statDetail">
            <p>Connections</p>
            <p>47</p>
          </div>
          <div className="sidebar__statDetail">
            <p>Who viewed your profile</p>
            <p>47</p>
          </div>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("Reactjs")}
        {recentItem("Nodejs")}
        {recentItem("Facebook")}
        {recentItem("Instagram")}
        {recentItem("Whatsapp")}
      </div>
    </div>
  );
}

export default Sidebar;
