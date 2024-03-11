import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Categories from 'views/products/category';
import SubCategories from 'views/products/subcategory';
import PriceChangeRecords from 'views/price-change/details';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//account routing
const AccountSetting = Loadable(lazy(() => import('views/profile/account-setting')));
const Changepassword = Loadable(lazy(() => import('views/profile/change-password')));

const PriceChange = Loadable(lazy(() => import('views/price-change')));
const Market = Loadable(lazy(() => import('views/market')));
const Users = Loadable(lazy(() => import('views/users')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// Product routing
const Products = Loadable(lazy(() => import('views/products/products')));
const AddProduct = Loadable(lazy(() => import('views/products/products/addProduct')));
const ViewProduct = Loadable(lazy(() => import('views/products/products/viewProduct')));
const UpdateProduct = Loadable(lazy(() => import('views/products/products/updateProduct')));

//delivery sites routing
const Sites = Loadable(lazy(() => import('views/sites')));
const SiteDetails = Loadable(lazy(() => import('views/sites/detail')));

// Customers Routing
const Customers = Loadable(lazy(() => import('views/customer')));
const ViewCustomer = Loadable(lazy(() => import('views/customer/view')));

//Orders Routing
const Orders = Loadable(lazy(() => import('views/orders')));
const OrderDetail = Loadable(lazy(() => import('views/orders/details')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Market />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'account-setting',
            element: <AccountSetting />
        },
        {
            path: 'change-password',
            element: <Changepassword />
        },

        {
            path: 'users',
            element: <Users />
        },

        {
            path: 'products',
            element: <Products />
        },

        {
            path: 'products/category',
            element: <Categories />
        },
        {
            path: 'products/sub-category',
            element: <SubCategories />
        },
        {
            path: 'products',
            element: <Products />
        },
        {
            path: 'add-product',
            element: <AddProduct />
        },
        {
            path: 'view-product',
            element: <ViewProduct />
        },
        {
            path: 'update-product',
            element: <UpdateProduct />
        },
        {
            path: 'pricing-changes',
            element: <PriceChange />
        },
        {
            path: 'change-records',
            element: <PriceChangeRecords />
        },
        {
            path: 'today-changes',
            element: <Market />
        },
        {
            path: 'sites',
            element: <Sites />
        },
        {
            path: 'site/detail',
            element: <SiteDetails />
        },
        {
            path: 'customers',
            element: <Customers />
        },
        {
            path: 'customer/detail',
            element: <ViewCustomer />
        },
        {
            path: 'orders',
            element: <Orders />
        },
        {
            path: 'order/detail',
            element: <OrderDetail />
        }
    ]
};

export default MainRoutes;
