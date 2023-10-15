import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';

const AccountSetting = () => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        padding: 3,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="h4">Zerihun Tegenu</Typography>
                    <Typography variant="subtitle2">zerihuntegenu5@gmail.com</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={5} xl={4}></Grid>
        </Grid>
    );
};

export default AccountSetting;
