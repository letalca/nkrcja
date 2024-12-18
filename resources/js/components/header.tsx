import { cn } from '@/lib/utils';
import { ElementRef, forwardRef, useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

interface HeaderProps extends React.HTMLAttributes<React.ElementRef<'header'>> {
    sticky?: boolean;
}

export const Header = forwardRef<ElementRef<'header'>, HeaderProps>(
    ({ className, sticky, children, ...props }, ref) => {
        const [offset, setOffset] = useState(0);
        useEffect(() => {
            const onScroll = () => {
                setOffset(
                    document.body.scrollTop ||
                        document.documentElement.scrollTop,
                );
            };
            document.addEventListener('scroll', onScroll, { passive: true });
            return () => document.removeEventListener('scroll', onScroll);
        }, []);

        return (
            <header
                ref={ref}
                className={cn(
                    'flex h-16 items-center gap-3 bg-background p-4 sm:gap-4',
                    sticky && 'sticky top-0 z-20',
                    offset > 10 && sticky ? 'shadow' : 'shadow-none',
                    className,
                )}
                {...props}
            >
                <SidebarTrigger
                    variant="outline"
                    className="scale-125 sm:scale-100"
                />
                <Separator orientation="vertical" className="h-6" />
                {children}
            </header>
        );
    },
);

Header.displayName = 'Header';
