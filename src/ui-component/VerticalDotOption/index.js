import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { Box, ClickAwayListener } from '@mui/material';
import { IconDotsVertical } from '@tabler/icons';

const VerticalDotOption = ({ children, sx }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ ...sx }}>
                <IconButton onClick={handleClick}>
                    <IconDotsVertical size={18} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    {children}
                </Menu>
            </Box>
        </ClickAwayListener>
    );
};

export default VerticalDotOption;
