import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import Logo from 'ui-component/Logo';
import PropTypes from 'prop-types';

const PriceChangeHeader = ({ todays, onToday }) => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: 3,
                    paddingY: 2,
                    backgroundColor: theme.palette.primary.dark
                }}
            >
                <Typography variant="h4" color={'white'}>
                    Price Listing
                </Typography>
                <Button variant={todays ? 'contained' : 'outlined'} color="secondary" onClick={onToday}>
                    Today Changes
                </Button>
            </Grid>
        </Grid>
    );
};

PriceChangeHeader.propTypes = {
    todays: PropTypes.bool,
    onToday: PropTypes.func
};
export default PriceChangeHeader;
