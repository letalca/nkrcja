import NkrcCommunityLogo from '@/assets/nkrc-community-logo.png';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import { navGroups } from './data/nav-groups';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;
    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Avatar className="size-8 rounded-lg">
                                    <AvatarImage
                                        src={NkrcCommunityLogo}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        NK
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    Rotaract Club of New Kingston
                                </span>
                                <span className="truncate text-xs">
                                    Zone 34 | District 7020
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
