import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { IconChevronRight } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { type NavGroup, NavItem } from './types';
import { Badge } from './ui/badge';

function NavGroup({ title, items }: NavGroup) {
    const { setOpenMobile } = useSidebar();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (!item.items) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={checkIsActive(item)}
                                    tooltip={item.title}
                                >
                                    <Link
                                        href={route(item.url)}
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        {item.badge && (
                                            <NavBadge>{item.badge}</NavBadge>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }
                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={checkIsActive(item, true)}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        {item.badge && (
                                            <NavBadge>{item.badge}</NavBadge>
                                        )}
                                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="CollapsibleContent">
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={checkIsActive(
                                                        subItem,
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            subItem.url,
                                                        )}
                                                        onClick={() =>
                                                            setOpenMobile(false)
                                                        }
                                                    >
                                                        {subItem.icon && (
                                                            <subItem.icon />
                                                        )}
                                                        <span>
                                                            {subItem.title}
                                                        </span>
                                                        {subItem.badge && (
                                                            <NavBadge>
                                                                {subItem.badge}
                                                            </NavBadge>
                                                        )}
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
    <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
);

function checkIsActive(item: NavItem, mainNav = false) {
    const href = (route().current() ?? 'dashboard').split('.')[0];
    const url = (item.url ?? 'dashboard').split('.')[0];
    if (mainNav) {
        return (item.items || []).filter((i) => i.url === href).length > 0;
    }
    return href === url;
}

export { NavGroup };
