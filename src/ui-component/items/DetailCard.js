import { Grid, Box, Typography, CardMedia } from '@mui/material';
import Connections from 'api';
import PropTypes from 'prop-types';

const ItemDetailCard = ({ data }) => {
    const ImageApi = Connections.itempictures;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ width: 240, height: 240 }}>
                    <CardMedia src={ImageApi + data.picture} sx={{ width: '100%', height: '100%' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}>
                    <Typography variant="subtitle1">Item</Typography>
                    <Typography variant="h4">{}</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

ItemDetailCard.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default ItemDetailCard;
