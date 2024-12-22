import { IconLayoutDashboard, IconUsers } from '@tabler/icons-react';
import { NavGroup } from '../types';

export const navGroups: NavGroup[] = [
    {
        title: 'General',
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: IconLayoutDashboard,
            },
            {
                title: 'Membership',
                url: '/members',
                icon: IconUsers,
            },
        ],
    },
];
