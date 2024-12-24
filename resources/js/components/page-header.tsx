import { Button } from '@/components/button';
import { type VariantProps } from 'class-variance-authority';
import { ElementType } from 'react';
import { buttonVariants } from './ui/conf/button-variants';
import { Separator } from './ui/separator';

type HeaderAction = {
    label?: string;
    icon?: ElementType;
    onClick?: () => void;
} & VariantProps<typeof buttonVariants>;

type PageHeaderProps = {
    title: string;
    subTitle?: string;
    actions?: HeaderAction[];
    showSeparator?: boolean;
};
export const PageHeader = ({
    title,
    subTitle,
    actions = [],
    showSeparator = true,
}: PageHeaderProps) => {
    return (
        <div>
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {title}
                    </h2>
                    {subTitle ? (
                        <p className="text-muted-foreground">{subTitle}</p>
                    ) : null}
                </div>
                {actions.length > 0 ? (
                    <div className="flex gap-2">
                        {actions.map((action, id) => {
                            return (
                                <Button
                                    key={id}
                                    variant={action.variant}
                                    size={action.size}
                                    className="space-x-1"
                                    onClick={action.onClick}
                                >
                                    {action.label ? (
                                        <span>Invite User</span>
                                    ) : null}
                                    {action.label && action.icon ? ' ' : null}
                                    {action.icon ? (
                                        <action.icon size={18} />
                                    ) : null}
                                </Button>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            {showSeparator && <Separator className="my-4 flex-none" />}
        </div>
    );
};
