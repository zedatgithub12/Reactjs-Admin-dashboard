import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Categories from 'views/products/category';
import SubCategories from 'views/products/subcategory';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//account routing
const AccountSetting = Loadable(lazy(() => import('views/profile/account-setting')));
const Changepassword = Loadable(lazy(() => import('views/profile/change-password')));

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

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
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
        }
    ]
};

export default MainRoutes;
