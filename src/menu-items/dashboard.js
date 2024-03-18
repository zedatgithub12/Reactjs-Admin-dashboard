// assets
import {
    IconDashboard,
    IconBuildingStore,
    IconUsers,
    IconHome,
    IconClipboardList,
    IconActivity,
    IconDeviceAnalytics,
    IconMapPins,
    IconShoppingBag
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconBuildingStore,
    IconUsers,
    IconHome,
    IconClipboardList,
    IconActivity,
    IconDeviceAnalytics,
    IconMapPins,
    IconShoppingBag
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'items',
            title: 'Products',
            type: 'collapse',
            url: '/products',
            icon: icons.IconClipboardList,
            breadcrumbs: false,
            children: [
                {
                    id: 'products',
                    title: 'Items',
                    type: 'item',
                    url: '/products',
                    breadcrumbs: false
                },
                {
                    id: 'category',
                    title: 'Categories',
                    type: 'item',
                    url: '/products/category',
                    breadcrumbs: false
                },
                {
                    id: 'sub-category',
                    title: 'Sub Category',
                    type: 'item',
                    url: '/products/sub-category',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'pricing-changes',
            title: 'Price Changes',
            type: 'item',
            url: '/pricing-changes',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'sites',
            title: 'Sites',
            type: 'item',
            url: '/sites',
            icon: icons.IconMapPins,
            breadcrumbs: true
        },
        {
            id: 'customers',
            title: 'Customers',
            type: 'item',
            url: '/customers',
            icon: icons.IconBuildingStore,
            breadcrumbs: false
        },

        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/orders',
            icon: icons.IconShoppingBag,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
