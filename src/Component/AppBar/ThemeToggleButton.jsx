import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../../Config/ThemeContext';

const ThemeToggleButton = () => {
    const { themeMode, toggleTheme } = useThemeContext();

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
    );
};

export default ThemeToggleButton;
