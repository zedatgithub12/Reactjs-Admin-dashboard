import { Grid, Box, Typography, useTheme } from '@mui/material';
import { DateFormatter } from 'utils/functions';
import Connections from 'api';
import PropTypes from 'prop-types';

const ItemDetailCard = ({ data }) => {
    const theme = useTheme();
    const ImageApi = Connections.itempictures;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ width: 240, height: 200, borderRadius: 4, padding: 1 }}>
                    {data.picture && (
                        <img
                            src={ImageApi + data.picture}
                            alt="item"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 4,
                                objectFit: 'cover'
                            }}
                        />
                    )}
                </Box>
                <Grid container>
                    <Grid item xs={12} bgcolor={theme.palette.grey[50]} paddingY={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2">Item code</Typography>
                            <Typography variant="h4">{data.code}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2">Item name</Typography>
                            <Typography variant="h4">{data.sub_category.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2">Item brand</Typography>
                            <Typography variant="h4">{data.brand}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2"> Unit</Typography>
                            <Typography variant="h4">{data.unit}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2"> SKU</Typography>
                            <Typography variant="h4">{data.sku}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2">Price</Typography>
                            <Typography variant="h4" color="primary">
                                {data.price} Birr
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 4, marginY: 2.5 }}>
                            <Typography variant="body2"> Status</Typography>
                            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                                {data.status}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ paddingX: 4, paddingY: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Price history</Typography>
                        {data.updates.length === 0 ? (
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="body1" paddingY={1}>
                                        There is no price update history
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            data.updates &&
                            data.updates.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 3 }}
                                >
                                    <Typography variant="body2">{DateFormatter(item.created_at)}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <Typography variant="body" marginRight={2} sx={{ textDecoration: 'line-through', color: 'grey' }}>
                                            {item.oldprice}
                                        </Typography>
                                        <Typography variant="h4">{item.newprice} Birr</Typography>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ItemDetailCard.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default ItemDetailCard;
