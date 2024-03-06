import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import FallbackImages from '../FallbackImages';

const Fallbacks = ({ severity, title, description, children, sx }) => {
    return (
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center', ...sx }}>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img src={FallbackImages(severity)} alt={severity} style={{ width: 160, height: 160, aspectRatio: 1, resize: 'inherit' }} />
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                    {title}
                </Typography>
                <Typography variant="caption">{description}</Typography>

                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

Fallbacks.propTypes = {
    severity: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    sx: PropTypes.any
};
export default Fallbacks;
