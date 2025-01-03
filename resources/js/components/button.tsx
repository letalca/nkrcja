import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { IconLoader2 } from '@tabler/icons-react';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { buttonVariants } from './ui/button';

interface ButtonPropsBase
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

type ButtonProps = ButtonPropsBase &
    (
        | { asChild: true }
        | {
              asChild?: false;
              loading?: boolean;
              leftSection?: React.JSX.Element;
              rightSection?: React.JSX.Element;
          }
    );

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        const { asChild, ...rest } = props;
        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </Slot>
            );
        }

        const {
            loading = false,
            leftSection,
            rightSection,
            disabled,
            ...otherProps
        } = props;

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={loading || disabled}
                ref={ref}
                {...otherProps}
            >
                {((leftSection && loading) ||
                    (!leftSection && !rightSection && loading)) && (
                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {!loading && leftSection && (
                    <div className="mr-2">{leftSection}</div>
                )}
                {children}
                {!loading && rightSection && (
                    <div className="ml-2">{rightSection}</div>
                )}
                {rightSection && loading && (
                    <IconLoader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
            </button>
        );
    },
);
Button.displayName = 'Button';

export { Button };
