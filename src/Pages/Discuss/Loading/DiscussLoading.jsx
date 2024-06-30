import { Box, Skeleton } from '@mui/material'
import React from 'react'

const DiscussLoading = () => {
    return (
        <Box style={{ margin: "30px" }}>
            <Skeleton style={{ height: "80px" }} />
            <Skeleton style={{ height: "70px" }} />
            <Skeleton style={{ height: "60px" }} />
        </Box>
    )
}

export default DiscussLoading