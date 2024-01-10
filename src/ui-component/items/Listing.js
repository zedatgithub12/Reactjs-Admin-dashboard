import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconStatusChange } from '@tabler/icons';
import Connections from 'api';
import PropTypes from 'prop-types';

const ItemListingOne = ({ image, brand, updated, code, sku, price, onPress, onUpdate }) => {
    const theme = useTheme();
    const ImageApi = Connections.itempictures;

    const handleIconButtonClick = (event) => {
        event.stopPropagation();
        onUpdate();
    };

    return (
        <Grid
            container
            bgcolor={'white'}
            sx={{ padding: 1, borderRadius: 2, marginTop: 1, border: 1, borderColor: theme.palette.primary[200] }}
            onClick={onPress}
        >
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
                                <Typography variant="h4">{brand}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {updated && <Typography variant="body2">Price updated</Typography>}
                            </Grid>
                        </Grid>
                        <Grid container mt={2}>
                            <Grid item xs={4}>
                                <Typography variant="body2">ኮድ {code}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="body2">{sku}</Typography>
                            </Grid>

                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Typography variant="h4" color="primary">
                                    {price} Birr
                                </Typography>
                                <IconButton onClick={handleIconButtonClick} sx={{ zIndex: 2 }}>
                                    <IconStatusChange />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ItemListingOne.propTypes = {
    image: PropTypes.string,
    brand: PropTypes.string,
    updated: PropTypes.bool,
    code: PropTypes.number,
    sku: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func,
    onUpdate: PropTypes.func
};

export default ItemListingOne;
