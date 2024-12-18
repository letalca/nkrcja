import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { SidebarProvider } from '@/components/ui/sidebar';
import Cookies from 'js-cookie';
import { PropsWithChildren } from 'react';
import BaseLayout from './base-layout';

interface HeaderProps extends PropsWithChildren {}

export default function Layout({ children }: HeaderProps) {
    const defaultOpen = Cookies.get('sidebar-state') !== 'false';
    console.log(route().current());
    return (
        <>
            <SidebarProvider defaultOpen={defaultOpen}>
                <a
                    className={`fixed left-44 z-[999] -translate-y-52 whitespace-nowrap bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-95 shadow transition hover:bg-primary/90 focus:translate-y-3 focus:transform focus-visible:ring-1 focus-visible:ring-ring`}
                    href="#content"
                >
                    Skip to Main
                </a>
                <AppSidebar />
                <BaseLayout>
                    <Header>
                        <div className="ml-auto flex items-center space-x-4">
                            <ProfileDropdown />
                        </div>
                    </Header>
                    {children}
                </BaseLayout>
            </SidebarProvider>
        </>
    );
}
