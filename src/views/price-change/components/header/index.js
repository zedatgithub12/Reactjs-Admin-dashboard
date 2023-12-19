import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import Logo from 'ui-component/Logo';

const PriceChangeHeader = () => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
                <Logo />
                <Box>
                    <Typography variant="body1">English</Typography>
                </Box>
            </Grid>

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
                <Typography variant="h2" color={'white'}>
                    የዋጋ ዝርዝር
                </Typography>
                <Button variant="outlined" color="secondary">
                    የዛሬን ብቻ
                </Button>
            </Grid>
        </Grid>
    );
};

export default PriceChangeHeader;
