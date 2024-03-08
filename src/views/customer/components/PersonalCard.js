import { Grid, useTheme } from '@mui/material';
import IconList from 'ui-component/lists/IconList';
import PropTypes from 'prop-types';

const PersonalCard = ({ name, gender, email, phone }) => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} paddingX={2} marginTop={1.2}>
                <IconList title={name} label="Customer name" />
                {gender && <IconList title={gender} label="Gender" />}
                {email && <IconList title={email} label="Email" />}
                {phone && <IconList title={phone} label="Phone" />}
            </Grid>
        </Grid>
    );
};

IconList.propTypes = {
    name: PropTypes.string,
    gender: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
};

export default PersonalCard;
