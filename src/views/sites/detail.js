import { useEffect, useState } from 'react';
import { Grid, Typography, useTheme, CircularProgress, Pagination, Box, Divider, IconButton, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons';
import Connections from 'api';
import CustomerList from 'views/customer/components/CustomerList';
import Fallbacks from 'utils/components/Fallbacks';
import { ActionMenu } from 'ui-component/menu/action';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import EditSite from './components/EditSite';
import DeliveryDates from './components/DeliveryDates';
import SheketPoper from 'ui-component/popups/SheketPoper';

const SiteDetails = () => {
    const theme = useTheme();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [siteCollapse, setSiteCollapse] = useState(true);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(state.status);
    const [siteCustomers, setSiteCustomer] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 20,
        page: 1,
        total: 0,
        lastPage: 1
    });

    const [open, setOpen] = useState(false);

    const handleOpenUpdate = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

    const handleStatusChange = () => {
        const token = sessionStorage.getItem('token');
        const Api = Connections.api + Connections.sites + `/change-status/${state?.id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'POST', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setStatus(response.data.status);
                    handlePrompt(response.message, 'success');
                } else {
                    handlePrompt(response.message, 'error');
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'error');
            });
    };

    const handlePrompt = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

    useEffect(() => {
        const FetchCustomers = () => {
            const token = sessionStorage.getItem('token');
            const Api =
                Connections.api +
                Connections.sites +
                `/customers?site=${state.id}&page=${paginationModel.page}&limit=${paginationModel.pageSize}`;
            const headers = {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, { method: 'GET', headers: headers })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setSiteCustomer(response.data.data);
                        setPaginationModel({
                            ...paginationModel,
                            lastPage: response.data.last_page
                        });
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setLoading(false);
                });
        };

        FetchCustomers();
        return () => {};
    }, [paginationModel.page, paginationModel.pageSize]);

    return (
        <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
            <Grid item xs={12} sm={12} md={9} lg={8} xl={7}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: theme.palette.background.default,
                            padding: 2,
                            marginTop: 1,
                            borderRadius: 2,
                            border: 0.5,
                            borderColor: theme.palette.grey[200]
                        }}
                        onClick={() => setSiteCollapse(!siteCollapse)}
                    >
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <IconButton
                                        sx={{ marginRight: 1.4, backgroundColor: theme.palette.grey[50], zIndex: 2 }}
                                        onClick={() => navigate('/sites')}
                                    >
                                        <IconArrowLeft size={18} />
                                    </IconButton>
                                    <Typography variant="h4">{state?.name}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            paddingX: 2,
                                            paddingY: 0.5,
                                            borderRadius: 6,
                                            border: 0.5,
                                            backgroundColor:
                                                status === 'active' ? theme.palette.primary[200] : theme.palette.secondary[200],
                                            borderColor: status === 'active' ? theme.palette.primary.main : theme.palette.secondary.main
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                                            {status}
                                        </Typography>
                                    </Box>
                                    <ActionMenu>
                                        <MenuItem onClick={handleOpenUpdate}>Update</MenuItem>
                                        <MenuItem onClick={handleStatusChange}>{status === 'active' ? 'Inactivate' : 'Activate'}</MenuItem>
                                    </ActionMenu>
                                </Box>
                            </Grid>
                        </Grid>

                        {siteCollapse && (
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 1,
                                        paddingTop: 2,
                                        borderTop: 0.5,
                                        borderColor: theme.palette.grey[100]
                                    }}
                                >
                                    <Grid container>
                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            <Typography variant="subtitle1" color="primary">
                                                {state?.sub_city}
                                            </Typography>
                                            <Typography variant="subtitle2">Sub city</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            <Typography variant="subtitle1" color="primary">
                                                {state?.woreda}
                                            </Typography>
                                            <Typography variant="subtitle2">Woreda</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            <Typography variant="subtitle1" color="primary">
                                                {state?.starting_address}
                                            </Typography>
                                            <Typography variant="subtitle2">Starting Address</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            <Typography variant="subtitle1" color="primary">
                                                {state?.end_address}
                                            </Typography>
                                            <Typography variant="subtitle2">End Address</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            borderRadius: 2,
                            marginTop: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: theme.palette.background.default,
                                padding: 2,
                                borderRadius: 2,
                                border: 0.5,
                                borderColor: theme.palette.grey[200]
                            }}
                        >
                            <Typography variant="subtitle1">Site Customers</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            borderRadius: 2,
                            marginTop: 1
                        }}
                    >
                        {loading ? (
                            <Grid container sx={{ justifyContent: 'center' }}>
                                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                                    <CircularProgress size={22} />
                                </Grid>
                            </Grid>
                        ) : error ? (
                            <Fallbacks severity="error" title="ooops" description="There is error fetching site customers" />
                        ) : siteCustomers.length === 0 ? (
                            <Fallbacks
                                sx={{ marginTop: 4 }}
                                severity="customer"
                                title="Customer not found"
                                description="There is no customer yet, they will be here soon"
                            />
                        ) : (
                            siteCustomers?.map((customer, index) => (
                                <CustomerList
                                    key={index}
                                    yourname={customer.yourname}
                                    fathername={customer.fathername}
                                    phone={customer.phone}
                                    shopname={customer.shopname}
                                    address={customer.address}
                                    status={customer.shopcode ? 'active' : 'pending'}
                                    onPress={() => navigate('/customer/detail', { state: customer })}
                                />
                            ))
                        )}
                    </Grid>

                    {paginationModel.lastPage > 1 && (
                        <Pagination
                            count={paginationModel.lastPage}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                            sx={{ float: 'right', marginTop: 2 }}
                        />
                    )}
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3.6} xl={3.6}>
                <DeliveryDates site={state && state} />
            </Grid>
            <EditSite open={open} handleClose={handleClose} site={state} />
            <SnackbarProvider maxSnack={3} />
        </Grid>
    );
};

export default SiteDetails;
