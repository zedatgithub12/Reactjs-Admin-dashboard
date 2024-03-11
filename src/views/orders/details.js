import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons';
import { ActionMenu } from 'ui-component/menu/action';
import { OrderTabs } from 'data/static/orderTabs';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Connections from 'api';
import OrderedItems from './components/OrderedItems';
import Fallbacks from 'utils/components/Fallbacks';
import { DateFormatter } from 'utils/functions';
import DeliveryDatePicker from './components/DeliveryDatePicker';

const OrderDetail = () => {
    const theme = useTheme();
    const token = localStorage.getItem('token');

    const { state } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [Items, setItems] = useState([]);
    const [orderCollapse, setorderCollapse] = useState(true);
    const [status, setStatus] = useState(state.order_status);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleStatusChange = (status) => {
        const token = localStorage.getItem('token');
        const Api = Connections.api + Connections.orders + `/status?orderid=${state.id}&status=${status}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, {
            method: 'POST',
            headers: headers
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setStatus(response.data.order_status);
                    handlePrompt(response.message, 'success');
                } else {
                    handlePrompt(response.message, 'error');
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'error');
            });
    };

    const handleOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

    const TimeFormatter = (date) => {
        const dateStr = date;
        const dateObj = new Date(dateStr);
        const dateWithoutOffset = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000); // Remove timezone offset

        const formattedDate = dateWithoutOffset.toISOString().slice(0, 19).replace('T', ' '); // Format date string without timezone offset

        return formattedDate;
    };

    const handleDateAssignment = () => {
        const token = localStorage.getItem('token');
        const Api = Connections.api + Connections.orders + `/${state.id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            delivery_date: TimeFormatter(selectedDate)
        };

        fetch(Api, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    handlePrompt(response.message, 'success');
                    setOpen(false);
                } else {
                    handlePrompt(response.message, 'error');
                    setOpen(false);
                }
            })
            .catch((error) => {
                handlePrompt(error.message, 'error');
                setOpen(false);
            });
    };

    useEffect(() => {
        const orderDetails = () => {
            const Api = Connections.api + Connections.orderItem + `/list/${state?.id}`;
            const headers = {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, {
                method: 'GET',
                headers: headers
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setItems(response.data);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setError(true);
                });
        };

        orderDetails();
        return () => {};
    }, []);

    const handlePrompt = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} sx={{ position: 'relative' }}>
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
                        onClick={() => setorderCollapse(!orderCollapse)}
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
                                    <Typography variant="h4">#{state?.id}</Typography>
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
                                                status != 'cancelled' ? theme.palette.primary[200] : theme.palette.secondary[200],
                                            borderColor: status != 'cancelled' ? theme.palette.primary.main : theme.palette.secondary.main
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                                            {status}
                                        </Typography>
                                    </Box>
                                    <ActionMenu>
                                        {OrderTabs.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                onClick={() => handleStatusChange(item)}
                                                sx={{ textTransform: 'capitalize' }}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </ActionMenu>
                                </Box>
                            </Grid>
                        </Grid>

                        {orderCollapse && (
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
                                                {state?.shop_code}
                                            </Typography>
                                            <Typography variant="subtitle2">Shop code</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            <Typography variant="subtitle1" color="primary">
                                                {state?.total_amount}
                                            </Typography>
                                            <Typography variant="subtitle2">Total Payment</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            <Typography variant="subtitle1" color="primary">
                                                {DateFormatter(state?.created_at)}
                                            </Typography>
                                            <Typography variant="subtitle2">Ordered on</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mt: 1 }}>
                                            {state?.delivery_date ? (
                                                <Typography variant="subtitle1" color="primary">
                                                    {DateFormatter(state?.delivery_date)}
                                                </Typography>
                                            ) : (
                                                <Button variant="contained" onClick={handleOpen}>
                                                    Assign delivery date
                                                </Button>
                                            )}

                                            {state?.delivery_date && <Typography variant="subtitle2">Deliver date</Typography>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {loading ? (
                    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={20} />
                    </Box>
                ) : error ? (
                    <Fallbacks severity="error" title="ooops" description="There is error fetching order detail" />
                ) : Items.length === 0 ? (
                    <Fallbacks
                        sx={{ marginTop: 3 }}
                        severity="empty"
                        title="No Item Found"
                        description="There is no item with this order number"
                    />
                ) : (
                    Items?.map((item, index) => (
                        <OrderedItems
                            key={index}
                            name={item.item_name}
                            brand={item.item_brand}
                            code={item.item_code}
                            sku={item.item_sku}
                            quantity={item.item_quantity}
                            price={item.item_price}
                        />
                    ))
                )}
            </Grid>

            <DeliveryDatePicker
                open={open}
                handleClose={handleClose}
                selectedDate={selectedDate}
                handleSelection={(date) => setSelectedDate(date)}
                handleSubmission={handleDateAssignment}
            />
            <SnackbarProvider />
        </Grid>
    );
};

export default OrderDetail;
