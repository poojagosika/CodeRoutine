import React from 'react'
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReactTimeAgo from "react-time-ago";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import getCuteAvatar from '../../Config/getCuteAvatar';
const DiscussList = ({ discussion }) => {
  const navagate = useNavigate();

  return (
    <ListItem
      button
      component="a"
      onClick={() => navagate(`${discussion._id}`)}
    >
      <ListItemAvatar>
        <Avatar
          alt={discussion?.author?.userName}
          src={getCuteAvatar(discussion?.author?.userName)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={discussion?.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
            >
              By: {discussion?.author?.userName} Created At:{" "}
              <ReactTimeAgo
                date={new Date(discussion?.createdAt).getTime()}
                locale="en-US"
              />
            </Typography>
          </React.Fragment>
        }
      />
      <Box textAlign="right">
        <Typography
          variant="body2"
          color="textSecondary"
          display={"flex"}
        >
          <ThumbUpIcon style={{ marginRight: 10 }} />{" "}
          {discussion?.likes}
        </Typography>
      </Box>
    </ListItem>
  )
}

export default DiscussList