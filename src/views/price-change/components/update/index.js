import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, FormHelperText, IconButton, Slide, TextField, Typography } from '@mui/material';
import { IconX } from '@tabler/icons';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationScheme = Yup.object().shape({
    newPrice: Yup.number().required('New price is required')
});

const UpdatePrice = ({ open, handleClose, item, handleSubmission, adding }) => {
    const handleSubmit = (values) => {
        handleSubmission(values);
    };

    const formik = useFormik({
        initialValues: { newPrice: item ? item.price : '' },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 1 }}>
                    <DialogTitle variant="h4">Update {item && item.brand} price</DialogTitle>
                    <IconButton onClick={handleClose}>
                        <IconX size={20} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 1, marginBottom: 1 }}>
                        <Typography variant="body1">Current Price</Typography>
                        <Typography variant="subtitle1">{item && item.price} Birr</Typography>
                    </Box>

                    <form noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="item_newPrice"
                            variant="outlined"
                            name="newPrice"
                            label="New price"
                            value={formik.values.newPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.newPrice && Boolean(formik.errors.newPrice)}
                        />
                        {formik.touched.newPrice && formik.errors.newPrice && (
                            <FormHelperText error id="standard-weight-helper-text-newPrice">
                                {formik.errors.newPrice}
                            </FormHelperText>
                        )}

                        <Button type="submit" disabled={adding} variant="contained" color="primary" fullWidth sx={{ marginTop: 4 }}>
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

UpdatePrice.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UpdatePrice;
