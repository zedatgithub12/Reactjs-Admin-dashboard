import { useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import { isDateEqualToToday } from 'utils/functions';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import ItemListingOne from 'ui-component/items/Listing';
import UpdatePrice from '../update';
import Connections from 'api';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const AllItems = ({ loading, data }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [expand, setExpand] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [adding, setAdding] = useState(false);
    const handleExapnd = (itemId) => {
        if (itemId === selectedItemId) {
            setExpand(!expand);
        } else {
            setSelectedItemId(itemId);
            setExpand(true);
        }
    };

    const handleClickOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (values) => {
        setAdding(true);
        // Handle form submission here
        // Declare the data to be sent to the API

        const user = JSON.parse(sessionStorage.getItem('user'));
        const updated_by = user.user.id;

        var Api = Connections.api + Connections.priceupdate;

        const data = {
            updated_by: updated_by,
            item_id: selectedItem.id,
            oldprice: selectedItem.price,
            newprice: values.newPrice
        };

        // Make the API call using fetch()
        fetch(Api, {
            method: 'POST',
            headers: { 'Content-Type': 'appication/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    handlePrompt(response.message, 'success');
                    setAdding(false);
                } else {
                    handlePrompt(response.message, 'error');
                    setAdding(false);
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'error');
                setAdding(false);
            });
    };

    const handlePrompt = (message, varaint) => {
        enqueueSnackbar(message, { varaint });
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                {loading ? (
                    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    data &&
                    data.map((subCat, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: 0.5,
                                cursor: 'pointer'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    padding: 1,
                                    backgroundColor:
                                        expand && selectedItemId === subCat.id ? theme.palette.grey[100] : theme.palette.primary.light
                                }}
                                onClick={() => handleExapnd(subCat.id)}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => handleExapnd(subCat.id)}>
                                        {expand && selectedItemId === subCat.id ? (
                                            <IconChevronDown size={16} />
                                        ) : (
                                            <IconChevronRight size={16} />
                                        )}
                                    </IconButton>
                                    <Typography variant="subtitle1">{subCat.name}</Typography>
                                </Box>
                                <Typography variant="body1" marginRight={2}>
                                    {subCat.items.length} አይነት
                                </Typography>
                            </Box>

                            {expand && selectedItemId === subCat.id && (
                                <Box>
                                    {subCat.items &&
                                        subCat.items.map((item, index) => (
                                            <ItemListingOne
                                                key={index}
                                                image={item.picture}
                                                brand={item.brand}
                                                updated={isDateEqualToToday(item.updated_at)}
                                                code={item.code}
                                                sku={item.sku}
                                                price={item.price}
                                                status={item.status}
                                                onPress={() => navigate('/change-records', { state: { id: item.id } })}
                                                onUpdate={() => handleClickOpen(item)}
                                            />
                                        ))}
                                </Box>
                            )}
                        </Box>
                    ))
                )}
                <SnackbarProvider maxSnack={3} />
            </Grid>
            <UpdatePrice open={open} handleClose={handleClose} item={selectedItem} handleSubmission={handleSubmit} adding={adding} />
        </Grid>
    );
};

AllItems.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default AllItems;
