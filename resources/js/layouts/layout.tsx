import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SearchProvider } from '@/context/search-context';
import Cookies from 'js-cookie';
import { PropsWithChildren } from 'react';
import BaseLayout from './base-layout';

export default function Layout({ children }: PropsWithChildren) {
    const defaultOpen = Cookies.get('sidebar-state') !== 'false';
    return (
        <>
            <SearchProvider>
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
                            <Search />
                            <div className="ml-auto flex items-center space-x-4">
                                <ProfileDropdown />
                            </div>
                        </Header>
                        {children}
                    </BaseLayout>
                </SidebarProvider>
            </SearchProvider>
        </>
    );
}
