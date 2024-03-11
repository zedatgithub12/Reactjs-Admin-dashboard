import { useEffect, useState } from 'react';
// material-ui
import { CircularProgress, Grid, Pagination, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { OrderTabs } from 'data/static/orderTabs';
import Connections from 'api';
import Fallbacks from 'utils/components/Fallbacks';
import OrderComp from './components/OrderComp';
import { DateFormatter } from 'utils/functions';
import { useNavigate } from 'react-router';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

// ==============================|| ORDERS PAGE ||============================== //

const Orders = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [value, setValue] = useState(sessionStorage.getItem('activeTab') || 'pending');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 20,
        page: 1,
        total: 0,
        lastPage: 1
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
        sessionStorage.setItem('activeTab', newValue);
    };

    const handleCancelOrder = (orderID) => {
        const Api = Connections.api + Connections.orders + `/status?orderid=${orderID}&status=cancelled`;
        const headers = {
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

    const handleFetching = async () => {
        const tokenExpiration = sessionStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime();

        if (tokenExpiration && currentTime >= tokenExpiration) {
            await RefreshToken();
            FetchTrainees();
        } else {
            FetchTrainees();
        }
    };

    useEffect(() => {
        const getOrders = () => {
            setLoading(true);
            var Api =
                Connections.api + Connections.orders + `?page=${paginationModel.page}&limit=${paginationModel.pageSize}&status=${value}`;
            var headers = {
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
                        setOrders(response.data.data);
                        setPaginationModel({
                            ...paginationModel,
                            lastPage: response.data.last_page
                        });
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setError(true);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setError(true);
                });
        };
        getOrders();
        return () => {};
    }, [paginationModel.page, paginationModel.pageSize, value]);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
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
                        <Typography variant="h4">Orders</Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Tabs value={value} onChange={handleChange} aria-label="Orders tabs">
                        {OrderTabs?.map((tab) => (
                            <Tab label={tab} value={tab} />
                        ))}
                    </Tabs>

                    {loading ? (
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                                <CircularProgress size={20} />
                            </Grid>
                        </Grid>
                    ) : error ? (
                        <Fallbacks sx={{ marginTop: 2 }} severity="error" title="ooops" description="There is error fetching sites" />
                    ) : orders.length == 0 ? (
                        <Fallbacks
                            sx={{ marginTop: 2 }}
                            severity="order"
                            title={`No ${value} Order`}
                            description="If we find one, it will be listed here"
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
                                onOrderCancel={() => handleCancelOrder(order.id)}
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
            <SnackbarProvider maxSnack={3} />
        </Grid>
    );
};
export default Orders;
