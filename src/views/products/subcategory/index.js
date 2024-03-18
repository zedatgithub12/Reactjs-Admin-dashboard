import { useState, useEffect } from 'react';
// material-ui
import {
    Typography,
    Grid,
    Box,
    Divider,
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
import { Search } from '@mui/icons-material';
import { IconTrash, IconEdit, IconPhoto } from '@tabler/icons';
import { gridSpacing } from 'store/constant';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import MainCard from 'ui-component/cards/MainCard';
import Connections from 'api';
import AddSubCategory from './components/add';
import Placeholder from 'ui-component/Placeholder';

// ==============================|| CATEGORY PAGE ||============================== //

const SubCategories = () => {
    const theme = useTheme();

    //category data
    const [mainCategories, setMainCategories] = useState([]);
    const [CategoryData, setCategoryData] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDesc, setNewCategoryDesc] = useState('');
    const [productPicture, setProductPicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);
    const [mainCatId, setMainCatId] = useState();
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

    const handleMainCategoryUpdate = (value) => {
        setNewCategoryName(value.name);
        setMainCatId(value.id);
    };

    const handleEditDialogOpen = (category) => {
        setSelectedCategory(category);
        setNewCategoryName(category.main_category.name);
        setMainCatId(category.main_category.id);
        setNewCategoryDesc(category.name);
        setEditDialogOpen(true);
    };

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

    const handleEditDialogClose = () => {
        setSelectedCategory(null);
        setNewCategoryName('');
        setMainCatId(null);
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
        const Api = Connections.api + Connections.sub_cat + '/' + selectedCategory.id;

        const data = new FormData();
        data.append('main_category_id', mainCatId);
        data.append('image', productPicture);
        data.append('name', newCategoryDesc);

        // Make the API call using fetch()
        fetch(Api, {
            method: 'POST',
            body: data
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    handlePrompt(response.message, 'success');
                    setSpinner(false);
                    handleEditDialogClose();
                    getSubCatgeory();
                } else {
                    handlePrompt(response.message, 'error');
                    setSpinner(false);
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'error');
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
                    handlePrompt(response.message, 'success');
                    setCategoryData(CategoryData);
                    handleDeleteDialogClose();
                    setSpinner(false);
                    getSubCatgeory();
                } else {
                    handlePrompt(response.message, 'error');
                    setSpinner(false);
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'success');
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
                } else {
                    handlePrompt(response.message, 'error');
                    setLoading(false);
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'error');
                setLoading(false);
            });
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
                    } else {
                        handlePrompt(response.message, 'error');
                    }
                })
                .catch(() => {
                    handlePrompt(error.message, 'error');
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
                    } else {
                        setLoading(false);
                        handlePrompt(response.message, 'error');
                    }
                })
                .catch((error) => {
                    handlePrompt(error.message, 'error');
                    setLoading(false);
                });
        };
        getMainCatgeory();
        getSubCatgeory();
        return () => {};
    }, []);

    const handlePrompt = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

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
                                            <TableCell sx={{ color: theme.palette.background.default }}>Picture</TableCell>
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
                                                    <TableCell>
                                                        {category.image ? (
                                                            <img
                                                                src={Connections.itempictures + category.image}
                                                                alt="sub category"
                                                                style={{
                                                                    width: 60,
                                                                    height: 60,
                                                                    background: theme.palette.grey[100],
                                                                    aspectRatio: 1,
                                                                    objectFit: 'contain',
                                                                    borderRadius: 8,
                                                                    padding: 2
                                                                }}
                                                            />
                                                        ) : (
                                                            <Placeholder />
                                                        )}
                                                    </TableCell>
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

            <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth>
                <DialogTitle variant="h4">Edit Sub Category</DialogTitle>
                <DialogContent>
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
                                ) : selectedCategory?.image ? (
                                    <img
                                        src={Connections.itempictures + selectedCategory.image}
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
                            <TextField {...params} margin="dense" label="Main Category" variant="outlined" fullWidth />
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

            <AddSubCategory
                open={addDialogOpen}
                mainCategories={mainCategories}
                handleClose={handleAddDialogClose}
                onAdded={getSubCatgeory}
            />

            <SnackbarProvider maxSnack={3} />
        </>
    );
};

export default SubCategories;
