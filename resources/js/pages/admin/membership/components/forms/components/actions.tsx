import { Button } from '@/components/button';
import { ButtonProps } from '@/components/ui/button';
import { FC } from 'react';

type Action = {
    onClick: () => void;
    className?: string;
    variant?: ButtonProps['variant'];
    label?: string;
    disabled?: boolean;
};

type ActionProps = {
    reset: Action;
    submit: Omit<Action, 'onClick'>;
};

export const FormAction: FC<ActionProps> = ({ reset, submit }) => {
    return (
        <div className="flex justify-end space-x-4">
            <Button
                type="button"
                variant={reset.variant || 'outline'}
                onClick={reset.onClick}
                className={reset.className}
                disabled={reset.disabled}
            >
                {reset.label ?? 'Reset'}
            </Button>
            <Button
                type="submit"
                variant={submit.variant || 'default'}
                className={submit.className}
                disabled={submit.disabled}
            >
                {submit.label ?? 'Save Changes'}
            </Button>
        </div>
    );
};
