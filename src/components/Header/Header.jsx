import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header = ({ goto, title, logo }) => {
    const navigate = useNavigate();

    const vaipara = () => {
        navigate(goto); 
    };
    const [theme, setTheme] = useState(() => localStorage.getItem('tema') || 'Claro');

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';
    const homeBgColor = theme === 'Claro' ? 'primary.main' : 'error.main';
    
    return (
        <div className="
            d-flex justify-content-between align-content-center 
            p-3 border-bottom shadow rounded caixota">
            <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between',width:'100%' }}>
            <Button 
                onClick={vaipara} 
                variant="contained" 
                color={buttonColor}
                className="fw-medium shadow">
                Voltar
            </Button>
                <span className="fw-bold h2">{title}</span>
            <Avatar sx={{ bgcolor: homeBgColor }}>
            <HomeIcon />
            </Avatar>
            </Box>
        </div>
    );
};

export default Header;
