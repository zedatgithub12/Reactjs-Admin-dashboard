import { useState } from 'react';
// material-ui
import {
    Grid,
    Typography,
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
import { IconPhoto } from '@tabler/icons';
import { useFormik } from 'formik';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Connections from 'api';
import PropTypes from 'prop-types';

const validationScheme = Yup.object().shape({
    name: Yup.string().required('Sub-category is required').max(30, 'Sub category name cannot exceed 30 characters')
});

const AddSubCategory = ({ open, handleClose, mainCategories, onAdded }) => {
    const theme = useTheme();

    const [addCategory, setAddCategory] = useState();
    const [productPicture, setProductPicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);
    const [mainCatId, setMainCatId] = useState();

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        setProductPicture(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPicturePreview(reader.result);
            };
        }
    };

    const handleMainCategory = (value) => {
        setAddCategory(value.name);
        setMainCatId(value.id);
    };

    const handleSubmitting = (values) => {
        if (!addCategory) {
            handlePrompt('Please select the main category first', 'error');
        } else {
            setAdding(true);
            var Api = Connections.api + Connections.sub_cat;

            const data = new FormData();
            data.append('main_category_id', mainCatId);
            data.append('image', productPicture);
            data.append('name', values.name);

            fetch(Api, {
                method: 'POST',
                body: data
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setAdding(false);
                        handlePrompt(response.message, 'success');
                        handleClose();
                        onAdded();
                    } else {
                        handlePrompt(response.message, 'error');
                        setAdding(false);
                    }
                })
                .catch((error) => {
                    handlePrompt(error.message, 'error');
                    setAdding(false);
                });
        }
    };
    const formik = useFormik({
        initialValues: { main_cat_id: '', name: '' },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            handleSubmitting(values);
        }
    });

    const [adding, setAdding] = useState(formik.isSubmitting);

    const handlePrompt = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h4">Create Sub Category</DialogTitle>

            <DialogContent>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            backgroundColor: theme.palette.primary.light,
                            borderRadius: 2
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePictureChange}
                            style={{ display: 'none' }}
                            id="product-picture"
                        />
                        <label htmlFor="product-picture">
                            <div
                                style={{
                                    width: 200,
                                    height: 200,
                                    border: 1,
                                    borderStyle: 'solid',
                                    borderRadius: 10,
                                    borderColor: theme.palette.grey[400],
                                    backgroundColor: theme.palette.primary.light,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                {picturePreview ? (
                                    <img
                                        src={picturePreview}
                                        alt="sub category"
                                        style={{ width: '100%', aspectRatio: 1, objectFit: 'cover', borderRadius: 6 }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <IconPhoto size={44} />
                                        <Typography variant="body1" color="primary" fullWidth style={{ height: '100%', marginTop: 6 }}>
                                            Upload picture
                                        </Typography>
                                    </Box>
                                )}
                            </div>
                        </label>
                    </Grid>

                    <FormControl
                        fullWidth
                        error={formik.touched.main_cat_id && Boolean(formik.errors.main_cat_id)}
                        sx={{ ...theme.typography.customInput, marginTop: 2 }}
                    >
                        <Autocomplete
                            options={mainCategories}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                if (value) {
                                    handleMainCategory(value);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin="dense"
                                    label="Main Category"
                                    name="main_cat_id"
                                    variant="outlined"
                                    fullWidth
                                />
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

            <SnackbarProvider maxSnack={3} />
        </Dialog>
    );
};

AddSubCategory.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    mainCategories: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    onAdded: PropTypes.func
};

export default AddSubCategory;
