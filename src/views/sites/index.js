// material-ui
import { Grid, Typography, Button, useTheme, CircularProgress, Pagination } from '@mui/material';
import Connections from 'api';
import { useEffect, useState } from 'react';
import Fallbacks from 'utils/components/Fallbacks';
import AddSite from './components/AddSite';
import SiteCard from './components/SiteCard';
import { useNavigate } from 'react-router';

// ==============================|| SITES PAGE ||============================== //

const Sites = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [site, setSite] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 20,
        page: 1,
        total: 0,
        lastPage: 1
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getSites = () => {
        setLoading(true);
        var Api = Connections.api + Connections.sites + `?page=${paginationModel.page}&limit=${paginationModel.pageSize}`;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setSite(response.data.data);
                    setPaginationModel({
                        ...paginationModel,
                        lastPage: response.data.last_page
                    });
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError(true);
                }
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    useEffect(() => {
        getSites();
        return () => {};
    }, [paginationModel.page, paginationModel.pageSize]);
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: theme.palette.background.default,
                            padding: 2,
                            borderRadius: 2,
                            border: 0.5,
                            borderColor: theme.palette.grey[200]
                        }}
                    >
                        <Typography variant="h4">Delivery Sites</Typography>
                        <Button variant="contained" onClick={() => handleClickOpen()}>
                            Add Site
                        </Button>
                    </Grid>
                </Grid>
                <Grid container>
                    {loading ? (
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                                <CircularProgress size={22} />
                            </Grid>
                        </Grid>
                    ) : error ? (
                        <Fallbacks severity="error" title="ooops" description="There is error fetching sites" />
                    ) : site.length == 0 ? (
                        <Fallbacks
                            severity="site"
                            title="No delivery site"
                            description="There is no added site yet, they will be here soon"
                        />
                    ) : (
                        site?.map((item, index) => (
                            <SiteCard
                                key={index}
                                id={item.id}
                                name={item.name}
                                sub_city={item.sub_city}
                                woreda={item.woreda}
                                starting_address={item.starting_address}
                                end_address={item.end_address}
                                onPress={() => navigate('/site/detail', { state: item })}
                            />
                        ))
                    )}

                    {paginationModel.lastPage > 1 && (
                        <Pagination
                            count={paginationModel.lastPage}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                            sx={{ float: 'right', marginTop: 2 }}
                        />
                    )}
                </Grid>
                <AddSite open={open} handleClose={handleClose} onAdded={() => getSites()} />
            </Grid>
        </Grid>
    );
};
export default Sites;
