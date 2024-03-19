import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';

const DeliveryDays = () => {
    const [day, setDay] = React.useState('Monday');

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    return (
        <Box sx={{ marginY: 2 }}>
            <Select
                labelId="day-select-label"
                id="day-select"
                fullWidth
                value={day}
                onChange={handleChange}
                sx={{ backgroundColor: '#fff' }}
            >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
        </Box>
    );
};

export default DeliveryDays;
