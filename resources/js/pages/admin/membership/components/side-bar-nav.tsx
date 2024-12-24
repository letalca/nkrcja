import { buttonVariants } from '@/components/ui/conf/button-variants';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ClubMember } from '@/types';
import { Link, router } from '@inertiajs/react';
import {
    IconAddressBook,
    IconBrandLinkedinFilled,
    IconMapPins,
    IconSchool,
    IconUser,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    member: ClubMember;
}

type _Routes = 'personal' | 'contact' | 'education' | 'address' | 'occupation';
type Routes = `members.${_Routes}`;

type RouteParams = {
    title: string;
    icon: JSX.Element;
    href: Routes;
};

export default function SidebarNav({
    className,
    member,
    ...props
}: SidebarNavProps) {
    const [val, setVal] = useState<Routes>(() => {
        const _route = route().current();
        return typeof _route === 'string' &&
            _route.startsWith('members.') &&
            [
                'personal',
                'contact',
                'education',
                'address',
                'occupation',
            ].includes(_route.split('.')[1])
            ? (_route as Routes)
            : 'members.personal';
    });

    const handleSelect = (e: Routes) => {
        setVal(e);
        router.get(route(e, { member: member.id }));
    };

    const routes: RouteParams[] = useMemo(
        () => [
            {
                title: 'Personal',
                icon: <IconUser size={18} />,
                href: 'members.personal',
            },
            {
                title: 'Contact',
                icon: <IconAddressBook size={18} />,
                href: 'members.contact',
            },
            {
                title: 'Address',
                icon: <IconMapPins size={18} />,
                href: 'members.address',
            },
            {
                title: 'Education',
                icon: <IconSchool size={18} />,
                href: 'members.education',
            },
            {
                title: 'Occupation',
                icon: <IconBrandLinkedinFilled size={18} />,
                href: 'members.occupation',
            },
        ],
        [],
    );

    return (
        <>
            <div className="p-1 md:hidden">
                <Select value={val} onValueChange={handleSelect}>
                    <SelectTrigger className="h-12 sm:w-48">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {routes.map((item) => (
                            <SelectItem
                                key={item.href}
                                value={route(item.href, { member: member.id })}
                            >
                                <div className="flex gap-x-4 px-2 py-1">
                                    <span className="scale-125">
                                        {item.icon}
                                    </span>
                                    <span className="text-md">
                                        {item.title}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <ScrollArea
                orientation="horizontal"
                type="always"
                className="hidden w-full min-w-40 bg-background px-1 py-2 md:block"
            >
                <nav
                    className={cn(
                        'flex space-x-2 py-1 lg:flex-col lg:space-x-0 lg:space-y-1',
                        className,
                    )}
                    {...props}
                >
                    {routes.map((item) => (
                        <Link
                            key={item.href}
                            href={route(item.href, { member: member.id })}
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                route().current() === item.href
                                    ? 'bg-muted hover:bg-muted'
                                    : 'hover:bg-transparent hover:underline',
                                'justify-start',
                            )}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
        </>
    );
}
