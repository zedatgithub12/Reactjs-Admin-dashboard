import React, { useState, useEffect } from 'react';
// material-ui
import {
    Typography,
    Grid,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    Autocomplete,
    FormControl,
    MenuItem,
    Select,
    TablePagination,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    useTheme
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
import AddSubCategory from './components/add';

// ==============================|| CATEGORY PAGE ||============================== //

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SubCategories = () => {
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

    //category data
    const [mainCategories, setMainCategories] = useState([]);
    const [CategoryData, setCategoryData] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [addCategory, setAddCategory] = useState('');
    const [mainCatId, setMainCatId] = useState();
    const [addCategoryDesc, setAddCategoryDesc] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDesc, setNewCategoryDesc] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState('Main Category');

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const filteredData = CategoryData.filter((category) => {
        let isMatch = true;

        if (categoryFilter !== 'Main Category') {
            isMatch = isMatch && category.main_category.name === categoryFilter;
        }

        return isMatch;
    });

    const uniqueCategories = new Set();

    // Loop through the CategoryData array and add each main_category value to the Set
    mainCategories.forEach((category) => {
        uniqueCategories.add(category.name);
    });

    const handleAddDialogOpen = () => {
        setAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
    };

    const handleMainCategory = (value) => {
        setAddCategory(value.name);
        setMainCatId(value.id);
    };

    const handleMainCategoryUpdate = (value) => {
        setNewCategoryName(value.id);
    };

    const addNewCategory = () => {
        if (addCategory === '') {
            setPopup({
                ...popup,
                status: true,
                severity: 'error',
                message: 'Please select main category'
            });
        } else if (addCategoryDesc === '') {
            setPopup({
                ...popup,
                status: true,
                severity: 'error',
                message: 'Please enter sub category name'
            });
        } else {
            setSpinner(true);
            var Api = Connections.api + Connections.sub_cat;
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            const data = {
                main_category_id: mainCatId,
                name: addCategoryDesc
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
                        setSpinner(false);
                        setCategoryData(CategoryData);
                        handleAddDialogClose();
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
                        message: 'There is error adding category!'
                    });
                    setSpinner(false);
                });
        }
    };

    const handleEditDialogOpen = (category) => {
        setSelectedCategory(category);
        setNewCategoryName(category.main_category.id);
        setNewCategoryDesc(category.name);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setSelectedCategory(null);
        setNewCategoryName('');
        setNewCategoryDesc('');
        setEditDialogOpen(false);
    };

    const handleDeleteDialogOpen = (category) => {
        setSelectedCategory(category);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setSelectedCategory(null);
        setDeleteDialogOpen(false);
    };

    const handleEditCategory = () => {
        setSpinner(true);
        var Api = Connections.api + Connections.sub_cat + '/' + selectedCategory.id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            main_category_id: newCategoryName,
            name: newCategoryDesc
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
                    setSpinner(false);
                    handleEditDialogClose();
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
                    message: 'There is error adding category!'
                });
                setSpinner(false);
            });
    };

    const handleDeleteCategory = () => {
        // Do something with the deleted category
        setSpinner(true);
        var Api = Connections.api + Connections.sub_cat + '/' + selectedCategory.id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        // Make the API call using fetch()
        fetch(Api, {
            method: 'DELETE',
            headers: headers
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
                    setCategoryData(CategoryData);
                    setSpinner(false);
                    handleDeleteDialogClose();
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
                    message: 'There is error adding category!'
                });
                setSpinner(false);
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    //useffect which fetches list of categories when component get mounted
    useEffect(() => {
        const getMainCatgeory = () => {
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
                        setMainCategories(response.data);
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

        const getSubCatgeory = () => {
            setLoading(true);
            var Api = Connections.api + Connections.sub_cat;
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
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: 'There is error featching category!'
                    });
                    setLoading(false);
                });
        };
        getMainCatgeory();
        getSubCatgeory();
        return () => {};
    }, []);

    const filteredCategories = filteredData.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const categoriesToShow = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Typography variant="h3">Sub Category</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ textDecoration: 'none' }}
                                    onClick={() => handleAddDialogOpen()}
                                >
                                    Create Sub Category
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className="shadow-1 p-4 pt-1 rounded ">
                            <TextField
                                label="Search Categories"
                                color="primary"
                                className="ms-2 mt-2 "
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <Search />
                                        </IconButton>
                                    )
                                }}
                            />
                            <FormControl sx={{ mx: 2 }}>
                                <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
                                    <MenuItem value="Main Category">Main Category</MenuItem>
                                    {Array.from(new Set(CategoryData.map((product) => product.name))).map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TableContainer sx={{ marginTop: 2 }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: theme.palette.primary.dark, borderRadius: 2 }}>
                                        <TableRow>
                                            <TableCell sx={{ color: theme.palette.background.default }}>No</TableCell>
                                            <TableCell sx={{ color: theme.palette.background.default }}>Main Category</TableCell>
                                            <TableCell sx={{ color: theme.palette.background.default }}>Sub Category</TableCell>
                                            <TableCell sx={{ color: theme.palette.background.default }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {loading ? (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={4} align="center" sx={{ paddingY: 6 }}>
                                                    <CircularProgress size={20} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ) : (
                                        <TableBody>
                                            {categoriesToShow.map((category, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{category.main_category.name}</TableCell>
                                                    <TableCell>{category.name}</TableCell>

                                                    <TableCell>
                                                        <IconButton onClick={() => handleEditDialogOpen(category)}>
                                                            <IconEdit size={18} />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDeleteDialogOpen(category)}>
                                                            <IconTrash size={18} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={filteredCategories.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </MainCard>

            <Dialog open={addDialogOpen} onClose={handleAddDialogClose} sx={{ minWidth: 300 }}>
                <DialogTitle variant="h4">Create Sub Category</DialogTitle>

                <DialogContent>
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
                    <TextField
                        margin="dense"
                        label="Sub Category"
                        color="primary"
                        value={addCategoryDesc}
                        onChange={(e) => setAddCategoryDesc(e.target.value)}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={() => addNewCategory()} color="primary" variant="contained" sx={{ paddingX: 4 }}>
                        {spinner ? <CircularProgress size={20} color="primary" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle variant="h4">Edit Sub Category</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        options={mainCategories}
                        getOptionLabel={(option) => option.name}
                        defaultValue={{ name: newCategoryName }}
                        onChange={(event, value) => {
                            if (value) {
                                handleMainCategoryUpdate(value);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField {...params} margin="dense" label="Main Category" variant="outlined" fullWidth required />
                        )}
                    />
                    <TextField
                        margin="dense"
                        label="Sub Category"
                        color="primary"
                        value={newCategoryDesc}
                        onChange={(e) => setNewCategoryDesc(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleEditCategory()} color="primary">
                        {spinner ? <CircularProgress size={20} color="primary" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Sub Category</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete the Sub category '{selectedCategory?.name}'?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteCategory()} color="error">
                        {spinner ? <CircularProgress size={20} color="error" /> : 'Yes'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* 
            <AddSubCategory open={addDialogOpen} handleClose={handleAddDialogClose} /> */}

            <Snackbar open={popup.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={popup.severity} sx={{ width: '100%' }}>
                    {popup.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SubCategories;
