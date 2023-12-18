// material-ui
import { Grid, Typography } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

const Pricing = () => (
    <Grid container>
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h3">Page </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body2">Body of content</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default Pricing;
