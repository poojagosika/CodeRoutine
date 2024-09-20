import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const HiringTeamCard = () => {
    return (
        <Stack spacing={2} sx={{ padding: '20px', backgroundColor: 'white' }}>
            <Typography variant="h5" gutterBottom>
                Meet the hiring team
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt="Cynthia Rachel Priyadarshini" src="https://example.com/avatar.jpg" />
                <Stack>
                    <Typography variant="subtitle1">
                        Cynthia Rachel Priyadarshini.A.
                    </Typography>
                    <Typography variant="body2">
                        Manager - Talent Acquisition
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Job poster
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        6 mutual connections
                    </Typography>
                </Stack>
            </Stack>
            <StyledButton variant="contained">
                Message
            </StyledButton>
        </Stack>
    );
};

export default HiringTeamCard;