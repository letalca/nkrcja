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
import { AnimatePresence, motion } from 'framer-motion';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export default function SidebarNav({ className, ...props }: SidebarNavProps) {
    const {
        formConfig: { setForm, formType },
        navItems,
    } = useMembershipForm();

    const itemVariants = {
        initial: {
            opacity: 0,
            x: -8,
        },
        animate: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.05,
                duration: 0.2,
                ease: 'easeOut',
            },
        }),
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2,
            },
        },
        active: {
            scale: 0.98,
            transition: {
                duration: 0.1,
            },
        },
        selected: {
            backgroundColor: '#f1f5f9',
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    const iconVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2,
                ease: 'backOut',
            },
        },
    };

    return (
        <>
            <div className="p-1 md:hidden">
                <Select value={formType} onValueChange={setForm}>
                    <SelectTrigger className="h-12 sm:w-48">
                        <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                        <AnimatePresence>
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.form}
                                    initial="initial"
                                    animate="animate"
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <SelectItem value={item.form}>
                                        <div className="flex gap-x-4 px-2 py-1">
                                            <motion.span
                                                className="scale-125 text-slate-900"
                                                variants={iconVariants}
                                                whileHover="hover"
                                            >
                                                {item.icon}
                                            </motion.span>
                                            <span className="text-md text-slate-900">
                                                {item.title}
                                            </span>
                                        </div>
                                    </SelectItem>
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
                    <AnimatePresence>
                        {navItems.map((item, index) => {
                            return (
                                <motion.button
                                    type="button"
                                    key={item.form}
                                    title={`Form ${item.form}`}
                                    onClick={() => setForm(item.form)}
                                    className={cn(
                                        buttonVariants({ variant: 'ghost' }),
                                        'justify-start text-slate-900',
                                        // formType === item.form &&
                                        //     'bg-slate-100 hover:bg-slate-100',
                                    )}
                                    variants={itemVariants}
                                    initial="initial"
                                    animate={
                                        formType === item.form
                                            ? 'selected'
                                            : 'animate'
                                    }
                                    whileHover="hover"
                                    whileTap="active"
                                    custom={index}
                                >
                                    <motion.span
                                        className="mr-2 text-slate-900"
                                        variants={iconVariants}
                                        whileHover="hover"
                                    >
                                        {item.icon}
                                    </motion.span>
                                    {item.title}
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </nav>
            </ScrollArea>
        </>
    );
}
