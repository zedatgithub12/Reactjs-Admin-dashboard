import { Grid, useTheme } from '@mui/material';
import IconList from 'ui-component/lists/IconList';
import PropTypes from 'prop-types';
import {
    IconAddressBook,
    IconBuildingStore,
    IconCalendar,
    IconCode,
    IconDirection,
    IconId,
    IconLocation,
    IconMapPin,
    IconMapPins,
    IconMoonStars,
    IconStar
} from '@tabler/icons';
import { DateFormatter } from 'utils/functions';

const BusinessInfo = ({ site, name, shopcode, level, address, created, status }) => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} paddingX={2} marginY={1.2}>
                {site && (
                    <IconList title={site} label="Site">
                        <IconMapPins size={20} style={{ color: theme.palette.primary.main }} />
                    </IconList>
                )}

                {name && (
                    <IconList title={name} label="Shop name">
                        <IconBuildingStore size={18} style={{ color: theme.palette.primary.main }} />
                    </IconList>
                )}

                {shopcode && (
                    <IconList title={shopcode} label="Shop code">
                        <IconId size={18} style={{ color: theme.palette.primary.main }} />
                    </IconList>
                )}

                {level && (
                    <IconList title={level} label="Level">
                        <IconStar size={18} style={{ color: theme.palette.primary.main }} />
                    </IconList>
                )}

                {address && (
                    <IconList title={address} label="Address">
                        <IconMapPin size={18} style={{ color: theme.palette.primary.main }} />
                    </IconList>
                )}

                {created && (
                    <IconList title={DateFormatter(created)} label="Created on">
                        <IconCalendar size={18} style={{ color: theme.palette.primary.main }} />
                    </IconList>
                )}
            </Grid>
        </Grid>
    );
};

IconList.propTypes = {
    name: PropTypes.string,
    site: PropTypes.string,
    shopcode: PropTypes.number,
    level: PropTypes.string,
    address: PropTypes.string,
    created: PropTypes.string,
    status: PropTypes.string
};

export default BusinessInfo;
