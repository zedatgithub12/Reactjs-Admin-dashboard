import { Grid, Avatar, Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const CustomerList = ({ yourname, fathername, phone, shopname, address, status }) => {
    const theme = useTheme();
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                alignItems: 'center',

                marginY: 2,
                padding: 1.4,
                border: 0.5,
                borderRadius: 3,
                borderColor: theme.palette.grey[200],
                cursor: 'pointer'
            }}
        >
            <Grid item xs={1.4}>
                <Avatar />
            </Grid>
            <Grid item xs={10.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{yourname}</Typography> <Typography variant="subtitle1">{fathername}</Typography>
                    </Box>
                    <Typography variant="body2">{shopname}</Typography>
                    <Typography variant="subtitle2">{status}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">{phone}</Typography>
                    <Typography variant="body2">{address}</Typography>
                    <Typography variant="body2"></Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

CustomerList.propTypes = {
    yourname: PropTypes.string,
    fathername: PropTypes.string,
    phone: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    shopname: PropTypes.string,
    address: PropTypes.any,
    status: PropTypes.any
};
export default CustomerList;
