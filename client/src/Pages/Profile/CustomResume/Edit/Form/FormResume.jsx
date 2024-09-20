import { Box, Button, Paper } from '@mui/material'
import React from 'react'
import Title from './Title';
import Contact from './Contact';
import Summary from './Summary';
import Experience from './Experience';
import TrainingCourses from './TrainingCourses';
import Projects from './Projects';
import Skills from './Skills';
import Custome from './Custome';

const FormResume = () => {
    const [page, setPage] = React.useState(1);

    return (
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {page > 1 &&
                    <Button onClick={() => setPage((prev) => prev - 1)}>Back</Button>
                }
                {page < 8 && <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>}
            </Box>
            {page === 1 && <Title setPage={setPage} />}
            {page === 2 && <Contact />}
            {page === 3 && <Summary />}
            {page === 4 && <Experience />}
            {page === 5 && <TrainingCourses />}
            {page === 6 && <Projects />}
            {page === 7 && <Skills />}
            {page === 8 && <Custome />}
        </Paper>
    )
}

export default FormResume