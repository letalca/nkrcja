import {
    IconLayoutDashboard,
    IconUsers,
    IconUserSearch,
} from '@tabler/icons-react';
import { NavGroup } from '../types';

export const navGroups: NavGroup[] = [
    {
        title: 'General',
        items: [
            {
                title: 'Dashboard',
                url: 'dashboard',
                icon: IconLayoutDashboard,
            },
        ],
    },
    {
        title: 'Club',
        items: [
            {
                title: 'Membership',
                items: [
                    {
                        title: 'Members',
                        url: 'members',
                        icon: IconUserSearch,
                    },
                ],
                icon: IconUsers,
            },
        ],
    },
];
