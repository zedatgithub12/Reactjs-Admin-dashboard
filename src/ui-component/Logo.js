// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         **/
        <img src={logo} alt="sheket" style={{ width: 60, height: 40, aspectRatio: 1, objectFit: 'contain' }} />
    );
};

export default Logo;
