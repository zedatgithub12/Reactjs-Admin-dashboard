import { useEffect, useState } from 'react';
import { Grid, Typography, useTheme, CircularProgress, Box, IconButton, MenuItem, Button, Divider, Pagination } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons';
import { ActionMenu } from 'ui-component/menu/action';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import PersonalCard from './components/PersonalCard';
import BusinessInfo from './components/BusinessInfo';
import ApprovalDialog from './components/ApprovalDialog';
import Connections from 'api';
import Fallbacks from 'utils/components/Fallbacks';
import OrderComp from 'views/orders/components/OrderComp';
import { DateFormatter } from 'utils/functions';

const ViewCustomer = () => {
    const theme = useTheme();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customerDetail, setCustomerDetail] = useState(null);

    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(false);
    const [orders, setOrders] = useState([]);

    const [status, setStatus] = useState(state.status);
    const [siteCollapse, setSiteCollapse] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 15,
        page: 1,
        total: 0,
        lastPage: 1
    });

    const [open, setOpen] = useState(false);

    const handleOpenApproval = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenUpdate = (event) => {
        event.stopPropagation();
        setOpen(true);
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

    const FetchCustomersInfo = () => {
        const token = sessionStorage.getItem('token');
        const Api = Connections.api + Connections.customers + `/${state?.id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'GET', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setCustomerDetail(response.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        FetchCustomersInfo();
        return () => {};
    }, []);

    const FetchCustomersOrders = () => {
        setOrderLoading(true);
        const token = sessionStorage.getItem('token');
        const Api =
            Connections.api + Connections.orders + `/customer/${state?.id}?page=${paginationModel.page}&limit=${paginationModel.pageSize}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'GET', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setOrders(response.data.data);
                    setPaginationModel({
                        ...paginationModel,
                        lastPage: response.data.last_page
                    });
                    setOrderLoading(false);
                } else {
                    setOrderLoading(false);
                    setOrderError(false);
                }
            })
            .catch(() => {
                setLoading(false);
                setOrderError(false);
            });
    };

    useEffect(() => {
        FetchCustomersOrders();
        return () => {};
    }, [paginationModel.page, paginationModel.pageSize]);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7}>
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
                                        onClick={() => navigate(-1)}
                                    >
                                        <IconArrowLeft size={18} />
                                    </IconButton>
                                    <Typography variant="h4">
                                        {state?.yourname} {state?.fathername}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    {customerDetail?.shopcode === null && (
                                        <Button variant="contained" onClick={handleOpenApproval}>
                                            Approve
                                        </Button>
                                    )}
                                    <ActionMenu>
                                        <MenuItem onClick={handleOpenUpdate}>Update</MenuItem>
                                    </ActionMenu>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container minHeight="30dvh">
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
                        ) : customerDetail === null ? (
                            <Fallbacks
                                sx={{ marginTop: 4 }}
                                severity="customer"
                                title="Customer Information is not found"
                                description="The customer information is not found in database"
                            />
                        ) : (
                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Grid
                                    item
                                    xs={12}
                                    md={5.8}
                                    sx={{ marginTop: 1, border: 0.5, borderColor: theme.palette.grey[200], borderRadius: 2, paddingY: 1 }}
                                >
                                    <Typography variant="h4" paddingX={2} paddingY={0.6}>
                                        Personal Info
                                    </Typography>
                                    <Divider />
                                    <PersonalCard
                                        name={`${customerDetail?.yourname} ${customerDetail?.fathername} ${
                                            customerDetail?.lastname ? customerDetail?.lastname : null
                                        }`}
                                        gender={customerDetail.gender}
                                        email={customerDetail.email}
                                        phone={customerDetail.phone}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={5.8}
                                    sx={{ marginTop: 1, border: 0.5, borderColor: theme.palette.grey[200], borderRadius: 2, paddingY: 1 }}
                                >
                                    <Typography variant="h4" paddingX={2} paddingY={0.6}>
                                        Business Info
                                    </Typography>
                                    <Divider />

                                    <BusinessInfo
                                        site={customerDetail.site_id}
                                        name={customerDetail.shopname}
                                        shopcode={customerDetail.shopcode}
                                        level={customerDetail.level}
                                        address={customerDetail.address}
                                        created={customerDetail.created_at}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid container minHeight="40dvh">
                    <Grid
                        item
                        xs={12}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            borderRadius: 2,
                            marginTop: 2
                        }}
                    >
                        {orders && (
                            <Typography variant="h4" marginX={2} marginY={1.6}>
                                Customer Order
                            </Typography>
                        )}
                        {orderLoading ? (
                            <Grid container sx={{ justifyContent: 'center' }}>
                                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                                    <CircularProgress size={22} />
                                </Grid>
                            </Grid>
                        ) : orderError ? (
                            <Fallbacks severity="error" title="ooops" description="There is error fetching site customers" />
                        ) : orders === null ? (
                            <Fallbacks
                                sx={{ marginTop: 4 }}
                                severity="order"
                                title="No customer order"
                                description="The customer don't have order yet"
                            />
                        ) : (
                            orders?.map((order, index) => (
                                <OrderComp
                                    key={index}
                                    orderID={order.id}
                                    orderDate={DateFormatter(order.order_date)}
                                    orderStatus={order.order_status}
                                    totalPayment={order.total_amount}
                                    deliveryDate={order.delivery_date}
                                    onPress={() => navigate('/order/detail', { state: { ...order } })}
                                />
                            ))
                        )}

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
            </Grid>

            {open && <ApprovalDialog cid={customerDetail?.id} open={open} handleClose={handleClose} onAdded={FetchCustomersInfo} />}
            <SnackbarProvider maxSnack={3} />
        </Grid>
    );
};

export default ViewCustomer;
