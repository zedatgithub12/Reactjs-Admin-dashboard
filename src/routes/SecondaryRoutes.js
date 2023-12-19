import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
const PriceChange = Loadable(lazy(() => import('views/price-change')));

// ==============================|| SECONDARY ROUTING ||============================== //

const SecondaryRouting = {
    path: '/',
    element: <PriceChange />,
    children: [
        {
            path: 'pricing-changes',
            element: <PriceChange />
        }
    ]
};

export default SecondaryRouting;
