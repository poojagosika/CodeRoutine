import { ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material'
import React from 'react'

const CommentLoading = () => {
    return (
        <ListItem >
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton variant="text" width="20%" />}
                secondary={<Skeleton variant="text" width="20%" />}
            />
        </ListItem>
    )
}

export default CommentLoading