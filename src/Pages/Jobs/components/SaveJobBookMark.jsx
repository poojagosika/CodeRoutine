import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedJob } from "../../../features/jobs/jobActions";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const SaveJobBookMark = ({ jobId }) => {
    const dispatch = useDispatch();
    const isSaved = useSelector((state) =>
        state.jobs.jobs.find((j) => j._id === jobId)?.saved
    );
    const toggleSaveStatus = async (e) => {
        e.stopPropagation();
        dispatch(toggleSavedJob(jobId));
    };
    return (
        <IconButton
            onClick={toggleSaveStatus}
            sx={{
                color: isSaved ? 'blue' : 'grey',
            }}
            aria-label="Save Job"
        >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};

export default SaveJobBookMark;
