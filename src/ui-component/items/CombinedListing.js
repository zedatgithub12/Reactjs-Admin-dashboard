import { Box, Grid, Typography } from '@mui/material';
import Connections from 'api';
import PropTypes from 'prop-types';

const CombinedListing = ({ name, image, brand, updated, code, sku, oldprice, price, status, onPress }) => {
    const ImageApi = Connections.itempictures;
    return (
        <Grid container bgcolor={'white'} sx={{ padding: 1, borderRadius: 2, marginTop: 1 }} onClick={onPress}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={3}>
                        <Box sx={{ width: 60, height: 60 }}>
                            <img
                                src={ImageApi + image}
                                alt={brand}
                                style={{
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    aspectRatio: 1 / 1,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 4
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography variant="h4">
                                    {brand} {name && `| ${name}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {updated && <Typography variant="body2">Price updated</Typography>}
                            </Grid>
                        </Grid>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                <Typography variant="body2">ኮድ {code}</Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2">{sku}</Typography>
                            </Grid>

                            <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                {oldprice && (
                                    <Typography variant="body2" color="grey" sx={{ textDecoration: 'line-through' }}>
                                        {oldprice}
                                    </Typography>
                                )}

                                <Typography variant="h4" color="primary">
                                    {price} <sup>ብር</sup>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

CombinedListing.propTypes = {
    image: PropTypes.string,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    brand: PropTypes.string,
    updated: PropTypes.bool,
    code: PropTypes.number,
    sku: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    oldprice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func,
    status: PropTypes.string
};

export default CombinedListing;
