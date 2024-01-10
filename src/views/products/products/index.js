import React, { useState, useEffect } from 'react';
// material-ui
import {
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    MenuItem,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Menu,
    CircularProgress
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material';
import { IconEdit, IconSearch, IconEye } from '@tabler/icons';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Connections from 'api';
import { useTheme } from '@mui/material/styles';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ActivityIndicators } from 'ui-component/activityIndicator';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const Status = ['available', 'unavailable', 'pending', 'hold'];
// ==============================|| PRODUCT PAGE ||============================== //

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Products = () => {
    const userString = sessionStorage.getItem('user');
    const users = JSON.parse(userString);
    const theme = useTheme();

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [productData, setProductData] = useState([]);
    const [searching, setSearching] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 20,
        page: 1,
        total: 0,
        lastPage: 1
    });

    const [loading, setLoading] = useState(true);

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

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearching = () => {
        setSearching(true);
        var Api =
            Connections.api +
            Connections.item +
            '/search' +
            `?page=${paginationModel.page}&limit=${paginationModel.pageSize}&query=${searchText}`;

        const token = sessionStorage.getItem('token');
        var headers = {
            Authorization: `Bearer` + token,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'GET', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setSearching(false);
                    setProductData(response.data.data);
                    setTotalRecords(response.data.last_page);
                } else {
                    setSearching(false);
                }
            })
            .catch((error) => {
                setSearching(false);
                handlePrompts(error, 'error');
            });
    };

    useEffect(() => {
        const getProducts = () => {
            setLoading(true);
            var Api = Connections.api + Connections.item + `?page=${page}&limit=${rowsPerPage}`;
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };
            // Make the API call using fetch()
            fetch(Api, {
                method: 'GET',
                headers: headers
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setProductData(response.data.data);
                        setTotalRecords(response.data.last_page);

                        setLoading(false);
                    } else {
                        setProductData(productData);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: 'There is error fetching product!'
                    });
                    setLoading(false);
                });
        };

        getProducts();
        return () => {};
    }, [page, rowsPerPage]);

    const handlePrompts = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between" sx={{ marginX: 1 }}>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h3">Products</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Button component={Link} to="/add-product" variant="outlined" color="primary" sx={{ textDecoration: 'none' }}>
                                Create New Item
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Box paddingX="2" className="shadow-1 p-3 rounded ">
                        <TextField
                            label="Search"
                            variant="outlined"
                            color="primary"
                            value={searchText}
                            onChange={handleSearchTextChange}
                            className="mb-2 mt-2"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleSearching()}>
                                            {searching ? <CircularProgress size={18} /> : <IconSearch />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table aria-label="product table">
                                <TableHead sx={{ backgroundColor: theme.palette.primary.dark, borderRadius: 2 }}>
                                    <TableRow>
                                        <TableCell></TableCell>

                                        <TableCell sx={{ color: theme.palette.background.default }}>Code</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>Category</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>Sub Category</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>Brand</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>Unit</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>SKU</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>Status</TableCell>
                                        <TableCell sx={{ color: theme.palette.background.default }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={9} align="center">
                                                <Box
                                                    sx={{ minHeight: 188, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                >
                                                    <ActivityIndicators />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ) : productData.length == 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} align="center">
                                                <Box
                                                    sx={{ minHeight: 188, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                >
                                                    <Typography>No Product</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        productData.map((product, index) => <ProductRow key={index} product={product} />)
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[15, 25, 50, 100]}
                                component="div"
                                count={parseInt(rowsPerPage * totalRecords)}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
            <SnackbarProvider maxSnack={3} />
            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </MainCard>
    );
};

const ProductRow = ({ product }) => {
    const userString = sessionStorage.getItem('user');
    const users = JSON.parse(userString);
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen = () => {
        setOpen(!open);
    };

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

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectItem = (event) => {
        handleMenuClick(event);
    };

    const handleStatusChange = (status, id) => {
        var Api = Connections.api + Connections.item + '/update-status/' + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            product_status: status
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
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
                    setAnchorEl(null);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error updating stock status!'
                });
            });
    };

    const handleTrashClick = (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setSelectedProduct(null);
        setDialogOpen(false);
    };

    const Delete = () => {
        // Do something with the deleted category
        setSpinner(true);
        var Api = Connections.api + Connections.deleteItems + selectedProduct.id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        // Make the API call using fetch()
        fetch(Api, {
            method: 'DELETE',
            headers: headers,
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

                    setSpinner(false);
                    handleDialogClose();
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                    setSpinner(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error deleting product!'
                });
                setSpinner(false);
            });
    };

    return (
        <>
            <TableRow
                hover
                className={
                    open
                        ? 'border border-5 border-top-0 border-bottom-0 border-end-0 border-secondary rounded bg-light'
                        : 'border-0 rounded'
                }
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>

                <TableCell>{product.code}</TableCell>
                <TableCell>{product.main_category_id}</TableCell>
                <TableCell>{product.sub_category_id}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.unit}</TableCell>

                <TableCell>
                    <span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded"> {product.sku}</span>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                    <span
                        className={
                            product.item_status === 'active'
                                ? 'bg-success bg-opacity-10 text-success px-2 py-1 rounded'
                                : 'bg-danger bg-opacity-10 text-danger px-2 py-1 rounded'
                        }
                    >
                        {product.status === 'deactivate' ? product.status + 'd' : product.status}
                    </span>
                </TableCell>

                <>
                    <TableCell>
                        <IconButton
                            aria-label="Edit row"
                            size="small"
                            onClick={() =>
                                navigate('/view-product', {
                                    state: { ...product }
                                })
                            }
                        >
                            <IconEye />
                        </IconButton>

                        <IconButton
                            aria-label="Edit row"
                            size="small"
                            onClick={() =>
                                navigate('/update-product', {
                                    state: { ...product }
                                })
                            }
                        >
                            <IconEdit />
                        </IconButton>
                        <IconButton aria-controls="row-menu" aria-haspopup="true" onClick={(event) => handleSelectItem(event, product)}>
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="row-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            className="shadow-sm"
                        >
                            {Status.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleStatusChange(item, product.id)}
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                    </TableCell>
                </>
            </TableRow>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>Do you want to delete {selectedProduct ? selectedProduct.item_name : ''} ?</DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button variant="text" color="error" onClick={() => Delete(selectedProduct.id)}>
                        {spinner ? (
                            <div className="spinner-border spinner-border-sm text-dark " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Yes'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </>
    );
};

ProductRow.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        item_image: PropTypes.string,
        item_name: PropTypes.string.isRequired,
        item_category: PropTypes.string.isRequired,
        item_sub_category: PropTypes.string.isRequired,
        item_brand: PropTypes.string.isRequired,
        item_price: PropTypes.number.isRequired,
        item_status: PropTypes.string.isRequired,
        item_code: PropTypes.string.isRequired,
        item_unit: PropTypes.string.isRequired,
        item_description: PropTypes.string.isRequired
    }).isRequired
};
export default Products;
