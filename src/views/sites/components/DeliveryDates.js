import { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconCalendar, IconPlus } from '@tabler/icons';
import Connections from 'api';
import Fallbacks from 'utils/components/Fallbacks';
import DeliveryDays from './DeliveryDays';

const DeliveryDates = () => {
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [schedules, setSchedulues] = useState([]);

    const getSchedules = () => {
        setLoading(true);
        var Api = Connections.api + Connections.deliveryschedules;
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
                    setSchedulues(response.data);
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

    useEffect(() => {
        getSchedules();
        return () => {};
    }, []);
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sx={{
                    backgroundColor: theme.palette.background.default,
                    padding: 2,
                    marginTop: 1,
                    borderRadius: 2,
                    border: 0.5,
                    borderColor: theme.palette.grey[200],
                    minHeight: 300
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: 0.5,
                        borderColor: theme.palette.grey[100],
                        paddingBottom: 1
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconCalendar size={24} style={{ color: theme.palette.secondary.dark }} />
                        <Typography variant="h4" marginLeft={2}>
                            Delivery Days
                        </Typography>
                    </Box>
                    <IconButton sx={{ backgroundColor: theme.palette.grey[50] }}>
                        <IconPlus size={19} style={{ color: theme.palette.primary.main }} />
                    </IconButton>
                </Box>

                <DeliveryDays />

                {loading ? (
                    <Grid container sx={{ justifyContent: 'center' }}>
                        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                            <CircularProgress size={22} />
                        </Grid>
                    </Grid>
                ) : error ? (
                    <Fallbacks severity="error" title="ooops" description="There is error fetching schedules" sx={{ marginTop: 2 }} />
                ) : schedules.length == 0 ? (
                    <Fallbacks
                        severity="schedules"
                        title="No delivery schedule"
                        description="The site delivery date is not found"
                        sx={{ marginTop: 2 }}
                    />
                ) : (
                    schedules?.map((date, index) => <Typography variant="h4">{date}</Typography>)
                )}
            </Grid>
        </Grid>
    );
};

export default DeliveryDates;
