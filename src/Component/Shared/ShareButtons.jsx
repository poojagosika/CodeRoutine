import React, { useState, forwardRef } from "react";
import {
    IconButton,
    Dialog,
    DialogContent,
    Box,
    Tooltip,
    Slide
} from "@mui/material";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    EmailIcon,
} from "react-share";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

// Custom transition component
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ShareButton = ({ url, shareTitle, description }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleClose = (e) => {
        setOpen(false);
        e.stopPropagation();
    };

    const copyLinkToClipboard = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <ShareIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogContent>
                    <Box
                        display="flex"
                        gap={2}
                        flexWrap="wrap"
                        justifyContent="space-around"
                    >
                        <Tooltip title="Share on Facebook">
                            <FacebookShareButton url={url} quote={shareTitle}>
                                <FacebookIcon size={30} round />
                            </FacebookShareButton>
                        </Tooltip>
                        <Tooltip title="Share on Twitter">
                            <TwitterShareButton url={url}>
                                <TwitterIcon size={30} round />
                            </TwitterShareButton>
                        </Tooltip>
                        <Tooltip title="Share on LinkedIn">
                            <LinkedinShareButton url={url} summary={description}>
                                <LinkedinIcon size={30} round />
                            </LinkedinShareButton>
                        </Tooltip>
                        <Tooltip title="Share on WhatsApp">
                            <WhatsappShareButton url={url}>
                                <WhatsappIcon size={30} round />
                            </WhatsappShareButton>
                        </Tooltip>
                        <Tooltip title="Share via Email">
                            <EmailShareButton url={url} subject={shareTitle} body={description}>
                                <EmailIcon size={30} round />
                            </EmailShareButton>
                        </Tooltip>
                        <Tooltip title="Copy Link">
                            <IconButton onClick={copyLinkToClipboard}>
                                <ContentCopyIcon size={30} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ShareButton;
