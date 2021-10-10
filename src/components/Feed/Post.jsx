import {
  ChatBubbleOutline,
  Send,
  Share,
  ThumbUpAlt,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import InputOption from "./InputOption";
import "./Post.css";

const Post = forwardRef(
  ({ name, description, message, timestamp, photo, image }, ref) => {
    return (
      <div ref={ref} className="post">
        <div className="post__header">
          <Avatar className='post__headerAvatar' src={photo} alt={photo} />
          <div className="post__info">
            <h2>{name}</h2>
            <p>{description}</p>
            <small>{new Date(timestamp?.toDate()).toUTCString()}</small>
          </div>
        </div>

        <div className="post__body">
          <p>{message}</p>
          {image &&   <img className="post__bodyImage" src={image} alt={image} />}
        </div>

        <div className="post__button">
          <InputOption Icon={ThumbUpAlt} title="Like" color="grey" />
          <InputOption Icon={ChatBubbleOutline} title="Like" color="grey" />
          <InputOption Icon={Share} title="Share" color="grey" />
          <InputOption Icon={Send} title="Send" color="grey" />
        </div>
      </div>
    );
  }
);

export default Post;
