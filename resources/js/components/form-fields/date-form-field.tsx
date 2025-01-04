import { Button } from '@/components/button';
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
import DatePicker from '../date-picker';
import { CalendarProps } from '../ui/calendar';
import { FormFieldProps, RenderFieldFunc } from './types';

export const DateFormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: FormFieldProps<TFieldValues, TName> & {
        minYear?: number;
        maxYear?: number;
        disabledDate?: CalendarProps['disabled'];
    },
) => {
    const {
        render,
        disabled,
        name,
        label,
        placeholder = '',
        control,
        maxYear,
        disabledDate,
        minYear = 2000,
        ...otherProps
    } = props;

    const renderDatePicker = ({
        field,
    }: RenderFieldFunc<TFieldValues, TName>): ReactElement => (
        <FormItem>
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
                    <DatePicker
                        initialDate={field.value}
                        onDateChange={field.onChange}
                        minYear={minYear}
                        maxYear={maxYear}
                        className="max-w-sm"
                        disabled={disabledDate}
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
