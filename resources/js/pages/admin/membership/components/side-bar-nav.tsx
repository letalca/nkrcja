import { buttonVariants } from '@/components/ui/conf/button-variants';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMembershipForm } from '@/hooks/use-membership-form';
import { cn } from '@/lib/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export default function SidebarNav({ className, ...props }: SidebarNavProps) {
    const {
        formConfig: { setForm, formType },
        navItems,
    } = useMembershipForm();

    return (
        <>
            <div className="p-1 md:hidden">
                <Select value={formType} onValueChange={setForm}>
                    <SelectTrigger className="h-12 sm:w-48">
                        <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                        {navItems.map((item) => (
                            <SelectItem key={item.form} value={item.form}>
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
                    {navItems.map((item) => (
                        <button
                            key={item.form}
                            onClick={() => setForm(item.form)}
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                formType === item.form
                                    ? 'bg-muted hover:bg-muted'
                                    : 'hover:bg-transparent hover:underline',
                                'justify-start',
                            )}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                        </button>
                    ))}
                </nav>
            </ScrollArea>
        </>
    );
}
