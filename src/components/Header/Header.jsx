import {
  Home,
  MenuBookOutlined,
  MenuOpen,
  Notifications,
  SearchOutlined,
  Sms,
  SupervisorAccount,
  Work,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebase";
import { logout, selectUser } from "../../features/userSlice";
import "./Header.css";
import HeaderOption from "./HeaderOption";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [menuButton, setMenuButton] = useState(false);

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    alert("You are now logged out");
  };

  return (
    <div className="header">
      <div className={`${menuButton ? "header__leftView" : "header__left"}`}>
        <img
          className="header__leftLogo"
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="Linked logo"
        />
        <div className="header__leftSearch">
          <SearchOutlined />
          <input type="text" placeholder="Search for jobs, companies... " />
        </div>
      </div>

      <div className={`${!menuButton ? "header__menu" : 'header__menuHide'}`}>
        <IconButton onClick={() => setMenuButton(!menuButton)}>
          <MenuOpen />
        </IconButton>
      </div>

      <div className={`${menuButton ? "showMenu" : "header__right"}`}>
        <HeaderOption Icon={Home} title="Home" />
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={Work} title="Jobs" />
        <HeaderOption Icon={Sms} title="Messaging" />
        <HeaderOption Icon={Notifications} title="Notifications" />
        <HeaderOption
          avatar={user?.photoURL}
          title="Me"
          onClick={logoutOfApp}
        />
      </div>
    </div>
  );
}

export default Header;
