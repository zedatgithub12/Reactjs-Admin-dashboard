import { useState } from 'react';
import { Box, CircularProgress, Grid, Pagination, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { isDateEqualToToday } from 'utils/functions';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CombinedListing from 'ui-component/items/CombinedListing';
import Connections from 'api';

const Market = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState(false);

    const [paginationModel, setPaginationModel] = useState({
        pagesize: 10,
        page: 1,
        lastpage: 0,
        total: 0
    });

    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    const FetchTodaysUpdate = () => {
        setLoading(true);
        var Api = Connections.api + Connections.todayupdates + `?page=${paginationModel.page}&limit=${paginationModel.pagesize}`;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setdata(response.data.data);
                    setPaginationModel({ ...paginationModel, total: response.data.total, lastpage: response.data.last_page });
                    setLoading(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error featching price updates!'
                });
                setLoading(false);
            });
    };

    useQuery(['data', paginationModel.page, paginationModel.pagesize], () => FetchTodaysUpdate(), {
        refetchOnWindowFocus: false
    });

    const handlePageChange = (event, value) => {
        setPaginationModel({
            ...paginationModel,
            page: value
        });
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ paddingX: 2, marginBottom: 1 }}>
                    <Typography variant="h4">{t('Today changes')}</Typography>
                </Box>
                {loading ? (
                    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : data && data.length == 0 ? (
                    <Typography variant="subtitle1"> {t('No today price update found')}</Typography>
                ) : (
                    data &&
                    data.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                paddingY: 0.5,
                                paddingX: 1,
                                cursor: 'pointer',
                                backgroundColor: theme.palette.primary.light
                            }}
                        >
                            <Box>
                                {item.items && (
                                    <CombinedListing
                                        key={index}
                                        image={item.items.picture}
                                        // name={subCat.name}
                                        brand={item.items.brand}
                                        updated={isDateEqualToToday(item.items.created_at)}
                                        code={item.items.code}
                                        sku={item.items.sku}
                                        oldprice={item.oldprice}
                                        price={item.items.price}
                                        status={item.items.status}
                                        onPress={() => navigate('/change-records', { state: { id: item.items.id } })}
                                    />
                                )}
                            </Box>
                        </Box>
                    ))
                )}

                {paginationModel.total > paginationModel.pagesize && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingY: 4, paddingX: 2 }}>
                        <Pagination count={paginationModel.lastpage} page={paginationModel.page} onChange={handlePageChange} />
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

Market.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default Market;
