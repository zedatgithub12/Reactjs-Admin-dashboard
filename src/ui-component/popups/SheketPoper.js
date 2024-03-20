import { useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Chip, ClickAwayListener, IconButton, MenuItem, Paper, Popper, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import { IconPlus } from '@tabler/icons';

// ==============================|| SHEKET POPER DIALOG ||============================== //

const SheketPoper = ({ children, icon }) => {
    const theme = useTheme();
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <IconButton
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    background: theme.palette.grey[50],
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.background.default,
                        background: `${theme.palette.background.default}!important`
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {icon}
            </IconButton>

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 6]
                            }
                        }
                    ]
                }}
                sx={{ zIndex: 1 }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default SheketPoper;
