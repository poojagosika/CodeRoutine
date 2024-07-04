import * as React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider, AdapterDateFns } from "@mui/x-date-pickers";

// Dummy data for problem-solving statuses (replace with actual data fetch logic)
const dummyProblemStatuses = {
    "2024-07-01": { solved: true, problems: ["Problem 1", "Problem 2"] },
    "2024-07-02": { solved: false, problems: [] },
    "2024-07-03": { solved: true, problems: ["Problem 3"] },
};

export default function ProblemCalendar() {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [problemStatus, setProblemStatus] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Simulating fetching problem-solving status based on the selected date
        const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        const status = dummyProblemStatuses[formattedDate] || { solved: false, problems: [] };
        setProblemStatus(status);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
            {selectedDate && (
                <div style={{ marginTop: 16 }}>
                    <h3>Problem Solving Status for {selectedDate.toDateString()}</h3>
                    {problemStatus ? (
                        <div>
                            <p><strong>Status:</strong> {problemStatus.solved ? "Solved" : "Not Solved"}</p>
                            {problemStatus.problems.length > 0 ? (
                                <div>
                                    <p><strong>Problems Solved:</strong></p>
                                    <ul>
                                        {problemStatus.problems.map((problem, index) => (
                                            <li key={index}>{problem}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No problems solved on this date.</p>
                            )}
                        </div>
                    ) : (
                        <p>No data available for selected date.</p>
                    )}
                </div>
            )}
        </LocalizationProvider>
    );
}
