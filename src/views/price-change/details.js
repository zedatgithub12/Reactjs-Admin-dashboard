import { useState } from 'react';
import { Grid, useTheme, useMediaQuery, IconButton, CircularProgress, Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons';
import Connections from 'api';
import ItemDetailCard from 'ui-component/items/DetailCard';

const PriceChangeRecords = () => {
    const navigate = useNavigate();
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
        var Api = Connections.api + Connections.priceupdate + '/' + state.id;
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
                minHeight: '70vh',
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
                    backgroundColor: theme.palette.background.default
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        {bigDevice && (
                            <IconButton onClick={() => navigate(-1)} sx={{ margin: 1 }}>
                                <IconArrowLeft size={22} />
                            </IconButton>
                        )}

                        {loading ? (
                            <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : (
                            data && data.map((item) => <ItemDetailCard key={item} data={item} />)
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

PriceChangeRecords.propTypes = {};
export default PriceChangeRecords;
