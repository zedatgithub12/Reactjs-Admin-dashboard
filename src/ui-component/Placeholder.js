// material-ui
import { useTheme } from '@mui/material';
import sheketplaceholder from 'assets/images/logo.png';

// ==============================|| Placeholder SVG ||============================== //

const Placeholder = () => {
    const theme = useTheme();
    return (
        <img
            src={sheketplaceholder}
            alt="sheket delivery"
            style={{
                width: 60,
                height: 60,
                padding: 2,
                background: theme.palette.grey[100],
                borderRadius: 8,
                aspectRatio: 1,
                objectFit: 'contain'
            }}
        />
    );
};

export default Placeholder;
