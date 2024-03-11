import { Grid, MenuItem, Typography, useTheme } from '@mui/material';
import { IconTruckDelivery, IconX } from '@tabler/icons';
import PropTypes from 'prop-types';
import VerticalDotOption from 'ui-component/VerticalDotOption';
import { DateFormatter } from 'utils/functions';

const Options = [{ name: 'cancel', title: 'Cancel order', icon: <IconX size={16} /> }];

const OrderComp = ({ orderID, orderDate, orderStatus, totalPayment, deliveryDate, onPress, onOrderCancel }) => {
    const theme = useTheme();

    const handleOptionClick = (event, name) => {
        event.stopPropagation();
        switch (name) {
            case 'cancel':
                onOrderCancel();
                break;
            default:
        }
    };

    return (
        <Grid container onClick={onPress}>
            <Grid
                xs={12}
                sx={{
                    padding: 2,
                    margin: 0.8,
                    border: 0.5,
                    borderColor: theme.palette.grey[200],
                    borderRadius: 3,
                    ':hover': { boxShadow: 1 },
                    cursor: 'pointer'
                }}
            >
                <Grid container>
                    <Grid xs={6}>
                        <Typography variant="h4">#{orderID}</Typography>
                        <Typography variant="subtitle2">Order ID</Typography>
                    </Grid>
                    <Grid xs={5.2}>
                        <Typography variant="h4" color="primary">
                            {totalPayment} Birr
                        </Typography>
                        <Typography variant="subtitle2">Total payment</Typography>
                    </Grid>
                    {/* {orderStatus === 'pending' && (
                        <Grid xs={0.8}>
                            <VerticalDotOption>
                                {Options.map((item, index) => (
                                    <MenuItem key={index} onClick={(event) => handleOptionClick(event, item.name)}>
                                        {item.icon}
                                        <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
                                            {item.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </VerticalDotOption>
                        </Grid>
                    )} */}
                </Grid>

                <Grid container paddingY={0.8}>
                    <Grid xs={6}>
                        <Typography variant="subtitle1">{orderDate}</Typography>
                        <Typography variant="subtitle2">Ordered on</Typography>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="subtitle1">{deliveryDate ? DateFormatter(deliveryDate) : 'Unsigned'}</Typography>
                        <Typography variant="subtitle2">Delivery date</Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            backgroundColor: orderStatus === 'cancelled' ? theme.palette.error.light : theme.palette.primary[200],
                            paddingX: 2,
                            paddingY: 0.5,
                            borderRadius: 1.4
                        }}
                    >
                        {orderStatus}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

OrderComp.propTypes = {
    orderID: PropTypes.number,
    orderDate: PropTypes.string,
    orderStatus: PropTypes.string,
    totalPayment: PropTypes.number,
    deliveryDate: PropTypes.string,
    onPress: PropTypes.func,
    onOrderCancel: PropTypes.func
};

export default OrderComp;
