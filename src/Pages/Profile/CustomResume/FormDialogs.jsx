import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ContextStore } from '../../../Context/ContextStore';
const resumeId = 1;
export default function FormDialogs({ open, setOpen }) {
    const [resumeName, setResumeName] = React.useState("");
    const { userData } = ContextStore();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {

        navigate(`/resume/${userData?.userName}/${resumeId}/edit`);
        handleClose();
    };

    return (
        <Box>
            <Dialog
                maxWidth="md" sx={{ mx: "auto" }}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit();
                    },
                }}
            >
                <DialogTitle>Create Resume</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="resumeName"
                        name="text"
                        label="Resume Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={resumeName}
                        onChange={(e) => setResumeName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
