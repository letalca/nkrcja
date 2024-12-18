import { KnownRouteName } from '@/types/ziggy';

interface BaseNavItem {
    title: string;
    badge?: string;
    icon?: React.ElementType;
}

export type NavItem =
    | (BaseNavItem & {
          items: (BaseNavItem & { url: `/${KnownRouteName}` })[];
          url?: never;
      })
    | (BaseNavItem & {
          url: `/${KnownRouteName}`;
          items?: never;
      });

interface NavGroup {
    title: string;
    items: NavItem[];
}

export type { NavGroup };
