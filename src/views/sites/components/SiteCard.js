import { Box, Grid, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const SiteCard = ({ id, name, sub_city, woreda, starting_address, end_address, onPress }) => {
    const theme = useTheme();
    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            sx={{
                margin: 0.8,
                padding: 1,
                border: 0.5,
                borderRadius: 3,
                borderColor: theme.palette.grey[200],
                cursor: 'pointer',
                ':hover': { boxShadow: 1 }
            }}
            onClick={onPress}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    paddingY: 6,
                    borderRadius: 2,
                    backgroundColor: theme.palette.secondary.light,
                    marginBottom: 1
                }}
            >
                <Typography variant="h4" color="primary" textAlign="center">
                    Site {id}
                </Typography>
            </Box>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">{sub_city}</Typography>
            <Typography variant="subtitle2">{woreda}</Typography>
            <Typography variant="subtitle2">{starting_address}</Typography>
            <Typography variant="subtitle2">{end_address}</Typography>
        </Grid>
    );
};

SiteCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    sub_city: PropTypes.string,
    woreda: PropTypes.string,
    starting_address: PropTypes.string,
    end_address: PropTypes.string,
    onPress: PropTypes.func
};

export default SiteCard;
