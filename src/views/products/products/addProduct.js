// material-ui
import {
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    Autocomplete,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    useTheme,
    Select,
    MenuItem
} from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// project imports
import React, { useState, useEffect } from 'react';
import Connections from 'api';
import { IconBox } from '@tabler/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MiniHeader } from 'ui-component/page-header/miniHeader';

// ==============================|| ADD ITEM PAGE ||============================== //

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationScheme = Yup.object().shape({
    main_category_id: Yup.number().required('Category is required'),
    sub_category_id: Yup.number().required('Sub category is required'),
    brand: Yup.string().required('Brand name is required'),
    unit: Yup.string().required('Item unit is required'),
    sku: Yup.string().required('SKU is required'),
    oldprice: Yup.number().required('old price is required'),
    price: Yup.number().required('Price is required')
});

const Units = ['kg', 'pack', 'litre', 'piece', 'bottle', 'box', 'carton', 'Derzen'];

const AddProduct = () => {
    const theme = useTheme();

    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPopup({
            ...popup,
            status: false
        });
    };

    // data
    const [CategoryData, setCategoryData] = useState([]);
    const [SubCategoryData, setSubCategoryData] = useState([]);
    //shops data
    const [productPicture, setProductPicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);

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

    const handleSubmit = (values) => {
        setAdding(true);
        // Handle form submission here
        // Declare the data to be sent to the API

        const user = JSON.parse(sessionStorage.getItem('user'));
        const added_by = user.user.id;

        var Api = Connections.api + Connections.item;

        const data = new FormData();
        data.append('added_by', added_by);
        data.append('picture', productPicture);
        data.append('main_category_id', values.main_category_id);
        data.append('sub_category_id', values.sub_category_id);
        data.append('brand', values.brand);
        data.append('unit', values.unit);
        data.append('sku', values.sku);
        data.append('oldprice', values.oldprice);
        data.append('price', values.price);

        // Make the API call using fetch()
        fetch(Api, {
            method: 'POST',
            body: data,
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });
                    setAdding(false);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                    setAdding(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error adding  product!'
                });
                setAdding(false);
            });
    };

    const formik = useFormik({
        initialValues: {
            main_category_id: '',
            sub_category_id: '',
            brand: '',
            unit: '',
            sku: '',
            oldprice: '',
            price: ''
        },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const [adding, setAdding] = useState(formik.isSubmitting);

    const handleSubCategory = () => {
        if (formik.values.main_category_id !== '') {
            const CatIndex = CategoryData.find((item) => item.id === formik.values.main_category_id);
            setSubCategoryData(CatIndex.subcategories);
        }
    };

    useEffect(() => {
        const getCatgeory = () => {
            var Api = Connections.api + Connections.main_cat;
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            // Make the API call using fetch()
            fetch(Api, {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setCategoryData(response.data);
                    }
                })
                .catch(() => {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: 'There is error fetching categories!'
                    });
                });
        };

        getCatgeory();
        return () => {};
    }, []);

    return (
        <Grid container sx={{ minHeight: 200, justifyContent: 'center' }}>
            <Grid
                item
                xs={12}
                sm={10}
                md={10}
                lg={8}
                xl={8}
                sx={{
                    borderRadius: 4,
                    border: '1px solid',
                    background: theme.palette.primary.light,
                    borderColor: theme.palette.primary[200],
                    ':hover': {
                        boxShadow: '0 2px 2px 0 rgb(32 40 45 / 8%)'
                    }
                }}
            >
                <MiniHeader title="Add Item" back={true} sx={{ backgroundColor: theme.palette.primary.dark }} />
                <Grid container>
                    <Grid item xs={12} padding={4}>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <Grid container spacing={1}>
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
                                                borderStyle: 'dashed',
                                                borderRadius: 6,
                                                borderColor: theme.palette.primary.main,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {picturePreview ? (
                                                <img src={picturePreview} alt="Product" style={{ width: '100%', borderRadius: 6 }} />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <IconBox size={24} />
                                                    <Typography
                                                        variant="contained"
                                                        color="primary"
                                                        component="span"
                                                        fullWidth
                                                        style={{ height: '100%' }}
                                                    >
                                                        Upload Picture
                                                    </Typography>
                                                </Box>
                                            )}
                                        </div>
                                    </label>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.main_category_id && Boolean(formik.errors.main_category_id)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-main_category_id">
                                            {formik.values.main_category_id ? '' : 'Category'}
                                        </InputLabel>
                                        <Select
                                            value={formik.values.main_category_id}
                                            onChange={formik.handleChange}
                                            id="outlined-adornment-main_category_id"
                                            name="main_category_id"
                                            onBlur={() => handleSubCategory()}
                                        >
                                            {CategoryData.length === 0 ? (
                                                <Typography variant="body2" sx={{ padding: 1 }}>
                                                    Category is not found
                                                </Typography>
                                            ) : (
                                                CategoryData.map((item, index) => (
                                                    <MenuItem key={index} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                        {formik.touched.main_category_id && formik.errors.main_category_id && (
                                            <FormHelperText error id="standard-weight-helper-text">
                                                {formik.errors.main_category_id}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.sub_category_id && Boolean(formik.errors.sub_category_id)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-sub_category_id">
                                            {formik.values.sub_category_id ? '' : 'Sub Category'}
                                        </InputLabel>
                                        <Select
                                            value={formik.values.sub_category_id}
                                            onChange={formik.handleChange}
                                            id="outlined-adornment-sub_category_id"
                                            name="sub_category_id"
                                        >
                                            {SubCategoryData.length === 0 ? (
                                                <Typography variant="body2" sx={{ padding: 1 }}>
                                                    Sub category is not found
                                                </Typography>
                                            ) : (
                                                SubCategoryData.map((item, index) => (
                                                    <MenuItem key={index} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                        {formik.touched.sub_category_id && formik.errors.sub_category_id && (
                                            <FormHelperText error id="standard-weight-helper-text">
                                                {formik.errors.sub_category_id}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.brand && Boolean(formik.errors.brand)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="item_brand">Item Brand</InputLabel>
                                        <OutlinedInput
                                            id="item_brand"
                                            name="brand"
                                            label="Item Brand"
                                            value={formik.values.brand}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            inputProps={{}}
                                        />
                                        {formik.touched.brand && formik.errors.brand && (
                                            <FormHelperText error id="standard-weight-helper-text-brand">
                                                {formik.errors.brand}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.unit && Boolean(formik.errors.unit)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="item_unit">Item unit</InputLabel>
                                        <Autocomplete
                                            id="item_unit"
                                            freeSolo
                                            options={Units}
                                            getOptionLabel={(option) => option}
                                            onChange={(event, value) => formik.setFieldValue('unit', value)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="unit"
                                                    value={formik.values.unit}
                                                    onChange={formik.handleChange}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                        {formik.touched.unit && formik.errors.unit && (
                                            <FormHelperText error id="standard-weight-helper-text-unit">
                                                {formik.errors.unit}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.sku && Boolean(formik.errors.sku)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="item_sku">Item SKU</InputLabel>
                                        <OutlinedInput
                                            id="item_sku"
                                            name="sku"
                                            label="Item sku"
                                            value={formik.values.sku}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            inputProps={{}}
                                        />
                                        {formik.touched.sku && formik.errors.sku && (
                                            <FormHelperText error id="standard-weight-helper-text-sku">
                                                {formik.errors.sku}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.oldprice && Boolean(formik.errors.oldprice)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="item_oldprice">Item oldprice</InputLabel>
                                        <OutlinedInput
                                            id="item_old_price"
                                            name="oldprice"
                                            label="Item old price"
                                            value={formik.values.oldprice}
                                            onChange={formik.handleChange}
                                            fullWidth
                                        />
                                        {formik.touched.oldprice && formik.errors.oldprice && (
                                            <FormHelperText error id="standard-weight-helper-text-oldprice">
                                                {formik.errors.oldprice}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
                                    <FormControl
                                        fullWidth
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="item_price">Item price</InputLabel>
                                        <OutlinedInput
                                            id="item_price"
                                            name="price"
                                            label="Item price"
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            fullWidth
                                        />
                                        {formik.touched.price && formik.errors.price && (
                                            <FormHelperText error id="standard-weight-helper-text-price">
                                                {formik.errors.price}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ minWidth: 180, backgroundColor: theme.palette.primary.main, margin: '1rem 0', padding: 1 }}
                            >
                                {adding ? <CircularProgress size={20} sx={{ color: theme.palette.background.default }} /> : 'Submit'}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                        {popup.message}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};

export default AddProduct;
