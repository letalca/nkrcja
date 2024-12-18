import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function BaseLayout({ children }: PropsWithChildren) {
    return (
        <div
            id="content"
            className={cn(
                'ml-auto w-full max-w-full',
                'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
                'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                'transition-[width] duration-200 ease-linear',
                'flex h-svh flex-col',
            )}
        >
            <Toaster />
            {children}
        </div>
    );
}
