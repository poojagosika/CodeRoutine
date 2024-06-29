import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const TopicLoadig = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" height={50} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="rectangular" height={150} />
        </Stack>
    )
}

export default TopicLoadig