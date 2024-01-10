import { Box, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { isDateEqualToToday } from 'utils/functions';
import PropTypes from 'prop-types';
import CombinedListing from 'ui-component/items/CombinedListing';

const TodaysUpdate = ({ loading, data }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Grid container>
            <Grid item xs={12}>
                {loading ? (
                    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : data && data.length == 0 ? (
                    <Typography variant="subtitle1"> No today price update found</Typography>
                ) : (
                    data &&
                    data.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: 1,
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
            </Grid>
        </Grid>
    );
};

TodaysUpdate.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default TodaysUpdate;
