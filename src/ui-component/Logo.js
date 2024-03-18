// material-ui
import logo from 'assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    return <img src={logo} alt="sheket" style={{ width: 60, height: 40, aspectRatio: 1, objectFit: 'contain' }} />;
};

export default Logo;
