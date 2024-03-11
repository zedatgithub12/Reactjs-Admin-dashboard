import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { IconCircleCheck } from '@tabler/icons';

const OrderedItems = ({ name, brand, code, sku, quantity, price }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Grid
            container
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 1.2,
                border: 0.5,
                borderColor: theme.palette.grey[200],
                borderRadius: 3
            }}
        >
            <Grid
                item
                xs={11.4}
                sx={{
                    padding: 1.4,
                    borderRadius: 2,
                    border: 1,
                    borderColor: theme.palette.secondary[200]
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconCircleCheck size={16} color={theme.palette.primary.main} />
                                <Typography variant="h4" sx={{ marginLeft: 1 }}>
                                    {t(brand)} {name && `| ${name}`}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container mt={2}>
                            <Grid item xs={3}>
                                <Typography variant="body2">
                                    {t('code')} {code}
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2">{t(sku)}</Typography>
                            </Grid>

                            <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Typography variant="body1">
                                    {quantity} * {price} {t('Birr')}
                                </Typography>
                                <Divider orientation="vertical" sx={{ marginX: 1 }} />
                                <Typography variant="subtitle1" color="primary">
                                    {(quantity * price).toFixed(2)} {t('Birr')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

OrderedItems.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    brand: PropTypes.string,
    code: PropTypes.number,
    sku: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    oldprice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default OrderedItems;
