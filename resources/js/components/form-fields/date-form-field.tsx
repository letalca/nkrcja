import { Button } from '@/components/button';
import { Calendar } from '@/components/ui/calendar';
import {
    FormField as BaseFormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDate } from '@/lib/utils';
import { IconCalendar } from '@tabler/icons-react';
import { ReactElement } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormFieldProps, RenderFieldFunc } from './types';

export const DateFormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: FormFieldProps<TFieldValues, TName>,
) => {
    const {
        render,
        disabled,
        name,
        label,
        placeholder = '',
        control,
        ...otherProps
    } = props;

    const renderDatePicker = ({
        field,
    }: RenderFieldFunc<TFieldValues, TName>): ReactElement => (
        <FormItem className="flex flex-col">
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Popover>
                <PopoverTrigger asChild disabled={disabled}>
                    <FormControl>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                            )}
                        >
                            {field.value ? (
                                formatDate(field.value.toISOString())
                            ) : (
                                <span>{placeholder}</span>
                            )}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );

    return (
        <BaseFormField
            render={render || renderDatePicker}
            name={name}
            control={control}
            {...otherProps}
        />
    );
};
