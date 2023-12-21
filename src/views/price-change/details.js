import { useState } from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import Connections from 'api';
import PropTypes from 'prop-types';
import Logo from 'ui-component/Logo';
import ItemDetailCard from 'ui-component/items/DetailCard';

const PriceChangeRecords = () => {
    const { state } = useLocation();

    const theme = useTheme();
    const bigDevice = useMediaQuery(theme.breakpoints.up('md'));
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    const FetchPriceChanges = () => {
        setLoading(true);
        var Api = Connections.api + Connections.priceupdate + '/' + state;
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
                    setData(response.data);
                    setLoading(false);
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
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

    useQuery(['data'], () => FetchPriceChanges(), {
        refetchOnWindowFocus: false
    });
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                paddingY: bigDevice && 2,
                backgroundColor: theme.palette.primary.light
            }}
        >
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                sx={{
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: theme.palette.background.default
                }}
            >
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
                    <Logo />
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        {data && data.map((item) => <ItemDetailCard key={item} data={item} />)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

PriceChangeRecords.propTypes = {};
export default PriceChangeRecords;
