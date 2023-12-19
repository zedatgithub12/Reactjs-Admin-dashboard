// assets
import { IconDashboard, IconBuildingStore, IconUsers, IconHome, IconClipboardList, IconActivity } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBuildingStore, IconUsers, IconHome, IconClipboardList, IconActivity };

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
            title: 'Items',
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
            title: 'Item Prices',
            type: 'item',
            url: '/pricing-changes',
            icon: icons.IconActivity,
            breadcrumbs: false
        },

        {
            id: 'users',
            title: 'Users',
            type: 'collapse',
            url: '/sample-page',
            icon: icons.IconUsers,
            breadcrumbs: false,
            children: [
                {
                    id: 'admins',
                    title: 'Admin',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'editor',
                    title: 'Editors',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'customer',
                    title: 'Customers',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default dashboard;
