import React, { useState, useEffect } from 'react';
// material-ui
import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    Autocomplete,
    CircularProgress,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    useTheme,
    DialogContent
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Search } from '@mui/icons-material';
import { IconTrash, IconEdit } from '@tabler/icons';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// import CategoryData from 'data/category';
import { gridSpacing } from 'store/constant';
import Connections from 'api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationScheme = Yup.object().shape({
    name: Yup.string().min(2, 'Too short for name').max(50, 'Name cannot exceed 50 characters').required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    department: Yup.string().required('Trainee is required')
});

const AddSubCategory = ({ open, handleClose, mainCategories }) => {
    const theme = useTheme();

    const [addCategory, setAddCategory] = useState();
    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    const handleMainCategory = (value) => {
        setAddCategory(value.name);
    };

    const formik = useFormik({
        initialValues: { main_cat_id: '', name: '' },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            handleSubmitting(values);
        }
    });

    const [adding, setAdding] = useState(formik.isSubmitting);

    return (
        <Dialog open={open} onClose={handleClose} sx={{ minWidth: 300 }}>
            <DialogTitle variant="h4">Create Sub Category</DialogTitle>

            <DialogContent>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={formik.touched.main_cat_id && Boolean(formik.errors.main_cat_id)}
                        sx={{ ...theme.typography.customInput, marginTop: 2 }}
                    >
                        <InputLabel htmlFor="outlined-adornment-main_cat_id">Category</InputLabel>
                        <Autocomplete
                            options={mainCategories}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value) {
                                    handleMainCategory(value);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField {...params} margin="dense" label="Main Category" variant="outlined" fullWidth required />
                            )}
                        />
                        {formik.touched.main_cat_id && formik.errors.main_cat_id && (
                            <FormHelperText error id="standard-weight-helper-text-main_cat_id">
                                {formik.errors.main_cat_id}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-name">Sub Category</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            type="name"
                            value={formik.values.name}
                            name="name"
                            onChange={formik.handleChange}
                            label="Sub Category"
                            inputProps={{}}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <FormHelperText error id="standard-weight-helper-text-name-login">
                                {formik.errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Button onClick={handleClose} variant="text" color="primary" sx={{ marginRight: 3 }}>
                            Cancel
                        </Button>
                        <AnimateButton>
                            <Button
                                disabled={adding}
                                size="small"
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ paddingX: 8, paddingY: 0.8 }}
                            >
                                {adding ? <CircularProgress size={16} sx={{ color: theme.palette.background.default }} /> : 'Save'}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddSubCategory;
