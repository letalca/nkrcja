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

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar(props: AppSidebarProps) {
    const {
        auth: { user },
        config: { club },
    } = usePage().props;

    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                <Avatar className="size-8 rounded-lg">
                                    <AvatarImage
                                        src={NkrcCommunityLogo}
                                        alt={`${club.name} Logo`}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {club.abbr}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {club.name}
                                </span>
                                <span className="truncate text-xs">
                                    Zone {club.zone} | District {club.district}
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
