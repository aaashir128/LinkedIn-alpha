import { FiberManualRecord, Info } from "@mui/icons-material";
import React from "react";
import "./Widgets.css";

function Widgets({ widgetsToggle }) {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__acticle">
      <div className="widgets__articleLeft">
        <FiberManualRecord />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className={`${widgetsToggle ? "widget-toggler" : "widgets"}`}>
      <div className="widgets__header">
        <h2>Linkedin News</h2>
        <Info />
      </div>

      {newsArticle("Linked Alpha Version", "Top news - 9099 readers")}
      {newsArticle("Tesla hits new highs", "Cars & auto - 300 readers")}
      {newsArticle("Bitcoin bulls in charge", "Top news - 2099 readers")}
      {newsArticle("React or Angular", "Which is best - 999 readers")}
      {newsArticle("Coronavirus is on End", "Top news - 9099 readers")}
    </div>
  );
}

export default Widgets;
