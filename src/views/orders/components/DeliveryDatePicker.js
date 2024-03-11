import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const DeliveryDatePicker = ({ open, handleClose, selectedDate, handleSelection, handleSubmission }) => {
    const handleDateChange = (date) => {
        handleSelection(date);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h4">Select Order Delivery Date</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            label="Choose a Date"
                            defaultValue={dayjs('2024-01-01')}
                            value={selectedDate}
                            onChange={handleDateChange}
                            onAccept={handleSubmission}
                            onCancel={handleClose}
                        />
                    </LocalizationProvider>
                </DialogContent>
            </Dialog>
        </div>
    );
};

DeliveryDatePicker.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    selectedDate: PropTypes.string,
    handleSelection: PropTypes.func,
    handleSubmission: PropTypes.func
};

export default DeliveryDatePicker;
