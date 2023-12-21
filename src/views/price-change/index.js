import { useState } from 'react';
// material-ui
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import PriceChangeHeader from './components/header';
import PriceChangeBody from './components/body';

// ==============================|| PRICE CHANGE LISTING PAGE ||============================== //

const PriceChange = () => {
    const theme = useTheme();
    const bigDevice = useMediaQuery(theme.breakpoints.up('md'));
    const [todays, setTodays] = useState(false);

    const handleView = () => {
        setTodays(!todays);
    };

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
                <PriceChangeHeader todays={todays} onToday={handleView} />
                <PriceChangeBody todays={todays} />
            </Grid>
        </Grid>
    );
};

export default PriceChange;
