import { Box, Container } from '@mui/material'
import React from 'react'
import ViewResume from './ViewResume'
import FormResume from './Form/FormResume'

const EditResume = () => {
    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: "flex-start",
                    gap: 2,
                }}
            >
                <FormResume />
                <ViewResume />


            </Box>
        </Container>
    )
}

export default EditResume