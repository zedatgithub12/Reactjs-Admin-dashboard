import { useEffect, useState } from 'react';
import { CircularProgress, Grid, Pagination, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import Connections from 'api';
import CustomerList from './components/CustomerList';
import Fallbacks from 'utils/components/Fallbacks';

const Customers = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customers, setCustomers] = useState([]);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 20,
        page: 1,
        total: 0,
        lastPage: 1
    });

    useEffect(() => {
        const FetchCustomers = () => {
            const token = sessionStorage.getItem('token');
            const Api = Connections.api + Connections.customers + `?page=${paginationModel.page}&limit=${paginationModel.pageSize}`;
            const headers = {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, { method: 'GET', headers: headers })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setCustomers(response.data.data);
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
                            paddingX: 2,
                            paddingY: 3,
                            borderRadius: 2,
                            border: 0.5,
                            borderColor: theme.palette.grey[200]
                        }}
                    >
                        <Typography variant="h4">Delivery Customers</Typography>
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
                        ) : customers.length === 0 ? (
                            <Fallbacks
                                sx={{ marginTop: 4 }}
                                severity="customer"
                                title="Customer not found"
                                description="There is no customer yet, they will be here soon"
                            />
                        ) : (
                            customers?.map((customer, index) => (
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
        </Grid>
    );
};

export default Customers;
