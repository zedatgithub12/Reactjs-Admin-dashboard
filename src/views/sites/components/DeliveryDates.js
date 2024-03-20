import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, Typography, useTheme } from '@mui/material';
import {
    IconBusStop,
    IconCalendar,
    IconCheck,
    IconCircleCheck,
    IconCircleDot,
    IconExchange,
    IconHandStop,
    IconMinus,
    IconPlus,
    IconPoint,
    IconPointOff,
    IconStatusChange,
    IconTrash,
    IconX
} from '@tabler/icons';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Connections from 'api';
import Fallbacks from 'utils/components/Fallbacks';
import SheketPoper from 'ui-component/popups/SheketPoper';
import MainCard from 'ui-component/cards/MainCard';

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DeliveryDates = ({ site }) => {
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [schedules, setSchedulues] = useState([]);

    const [IsAdding, setIsAdding] = useState(false);
    const [dayIndex, setDayIndex] = useState(false);

    const handleScheduleAdditon = (day, i) => {
        setIsAdding(true);
        setDayIndex(i);

        const token = sessionStorage.getItem('token');
        const Api = Connections.api + Connections.deliveryschedules;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            site_id: site.id,
            delivery_day: day
        };

        fetch(Api, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setIsAdding(false);
                    handlePrompts(response.message, 'success');
                    getSchedules();
                } else {
                    setIsAdding(false);
                    handlePrompts(response.message, 'error');
                }
            })
            .catch((error) => {
                setIsAdding(false);
                handlePrompts(error.message, 'success');
            });
    };

    const handleScheduleRemoval = (id) => {
        const token = sessionStorage.getItem('token');
        const Api = Connections.api + Connections.deliveryschedules + `/${id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, {
            method: 'DELETE',
            headers: headers
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    handlePrompts(response.message, 'success');
                    getSchedules();
                } else {
                    handlePrompts(response.message, 'error');
                }
            })
            .catch((error) => {
                handlePrompts(error.message, 'success');
            });
    };

    const handleStatusChange = (id) => {
        const token = sessionStorage.getItem('token');
        const Api = Connections.api + Connections.deliveryschedules + `/change-status/${id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, { method: 'POST', headers: headers })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    handlePrompts(response.message, 'success');
                    getSchedules();
                } else {
                    handlePrompts(response.message, 'error');
                }
            })
            .catch((error) => {
                handlePrompts(error.message, 'error');
            });
    };

    const getSchedules = () => {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        var Api = Connections.api + Connections.deliveryschedules + `/${site.id}`;
        var headers = {
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

    const handlePrompts = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };
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
                        paddingBottom: 1,
                        marginBottom: 1
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconCalendar size={24} style={{ color: theme.palette.secondary.dark }} />
                        <Typography variant="h4" marginLeft={2}>
                            Delivery Days
                        </Typography>
                    </Box>

                    <SheketPoper icon={<IconPlus size={19} style={{ color: theme.palette.primary.main }} />}>
                        <MainCard
                            border={false}
                            elevation={10}
                            content={false}
                            borderRadius={2}
                            boxShadow
                            shadow={theme.shadows[16]}
                            sx={{ paddingY: 2, paddingX: 0.6 }}
                        >
                            {Days?.map((day, index) => (
                                <MenuItem
                                    key={index}
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    value={day}
                                    onClick={() => handleScheduleAdditon(day, index)}
                                >
                                    <Typography variant="body1"> {day}</Typography>
                                    {dayIndex === index && IsAdding && <CircularProgress size={12} />}
                                </MenuItem>
                            ))}
                        </MainCard>
                    </SheketPoper>
                </Box>

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
                    schedules?.map((date, index) => (
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography key={index} variant="body2">
                                    {date.delivery_day}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="text"
                                        color={date.status === 'active' ? 'primary' : 'dark'}
                                        sx={{ zIndex: 0, fontSize: 12, textTransform: 'capitalize', marginRight: 2 }}
                                        onClick={() => handleStatusChange(date.id)}
                                    >
                                        {date.status === 'active' ? (
                                            <IconCheck size={14} style={{ marginRight: 3 }} />
                                        ) : (
                                            <IconPoint size={12} style={{ marginRight: 3 }} />
                                        )}

                                        {date.status === 'active' ? 'UP' : 'Down'}
                                    </Button>

                                    <IconButton onClick={() => handleScheduleRemoval(date.id)} sx={{ marginTop: 1 }}>
                                        <IconMinus size={12} style={{ color: theme.palette.error.dark }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    ))
                )}
            </Grid>

            <SnackbarProvider maxSnack={3} />
        </Grid>
    );
};

export default DeliveryDates;
