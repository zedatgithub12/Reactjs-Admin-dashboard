import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const IconList = ({ children, title, label }) => {
    return (
        <Grid container marginTop={1}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                {children}
                <Box marginLeft={2}>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant="subtitle2">{label}</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

IconList.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    label: PropTypes.string
};

export default IconList;
