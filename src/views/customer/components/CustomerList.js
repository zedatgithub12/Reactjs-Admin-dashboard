import { Grid, Avatar, Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const CustomerList = ({ yourname, fathername, phone, shopname, address, status, onPress }) => {
    const theme = useTheme();
    return (
        <Grid
            container
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 1,
                paddingX: 1.6,
                paddingY: 0.2,
                border: 0.5,
                borderRadius: 2,
                borderColor: theme.palette.grey[100],
                cursor: 'pointer'
            }}
            onClick={onPress}
        >
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
                <Avatar />
                <Box marginLeft={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{yourname}</Typography> <Typography variant="subtitle1">{fathername}</Typography>
                    </Box>
                    <Typography variant="body2">{phone}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginY: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">{shopname}</Typography>
                </Box>
                <Typography variant="body2">{address}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginY: 1 }}>
                <Box sx={{ position: 'absolute', right: 2, top: 1, padding: 1 }}>
                    <Typography variant="subtitle2">{status}</Typography>
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
    status: PropTypes.any,
    onPress: PropTypes.func
};
export default CustomerList;
