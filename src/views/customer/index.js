import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Connections from 'api';
import CustomerList from './components/CustomerList';

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const FetchCustomers = () => {
            const token = sessionStorage.getItem('token');
            const Api = Connections.api + Connections.customers;
            const headers = {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, { method: 'GET', headers: headers })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setCustomers(response.data);
                    } else {
                    }
                });
        };

        FetchCustomers();
        return () => {};
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                    <Grid item xs={12} sm={12} md={7.2} lg={7.2} xl={7.2} sx={{ boxShadow: 1, padding: 2, borderRadius: 2 }}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h4">Customers</Typography>
                        </Box>

                        {customers?.map((customer, index) => (
                            <CustomerList
                                key={index}
                                yourname={customer.yourname}
                                fathername={customer.fathername}
                                phone={customer.phone}
                                shopname={customer.shopname}
                                address={customer.address}
                                status={customer.shopcode ? 'active' : 'pending'}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ boxShadow: 1, padding: 2, borderRadius: 2 }}>
                        <Typography variant="h4">Sites</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Customers;
