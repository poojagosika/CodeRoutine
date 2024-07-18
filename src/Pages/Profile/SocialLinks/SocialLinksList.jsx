import React from 'react'
import { Box, Tooltip, Link } from '@mui/material';
import {
    LinkedIn,
    GitHub,
    X,
    Language,
    Public,
    AccountCircle,
} from "@mui/icons-material";
const SocialLinksList = ({ urls }) => {
    return (
        <Box pl={2} gap={2} flexWrap={'wrap'} sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start' }} >
            {urls?.linkedin && (
                <Tooltip title="LinkedIn" arrow>
                    <Link
                        href={urls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedIn color="primary" />
                    </Link>
                </Tooltip>
            )}
            {urls.github && (
                <Tooltip title="GitHub" arrow>
                    <Link
                        href={urls.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHub color="primary" />
                    </Link>
                </Tooltip>
            )}
            {urls.x && (
                <Tooltip title="X" arrow>
                    <Link href={urls.x} target="_blank" rel="noopener noreferrer">
                        <X color="primary" />
                    </Link>
                </Tooltip>
            )}
            {urls.blog && (
                <Tooltip title="Blog" arrow>
                    <Link href={urls.blog} target="_blank" rel="noopener noreferrer">
                        <Public color="primary" />
                    </Link>
                </Tooltip>
            )}
            {urls.portfolio && (
                <Tooltip title="Portfolio" arrow>
                    <Link
                        href={urls.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AccountCircle color="primary" />
                    </Link>
                </Tooltip>
            )}
            {urls.additional &&
                urls.additional.map(
                    (url, index) =>
                        url && (
                            <Tooltip title={`Work Sample ${index + 1}`} key={index} arrow>
                                <Link href={url} target="_blank" rel="noopener noreferrer">
                                    <Language color="primary" />
                                </Link>
                            </Tooltip>
                        )
                )}
        </Box>

    )
}

export default SocialLinksList