import {
    FormField as BaseFormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormFieldProps, RenderFieldFunc } from './types';

export const TextFormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: FormFieldProps<TFieldValues, TName>,
) => {
    const {
        render,
        name,
        label,
        placeholder = '',
        control,
        ...otherProps
    } = props;

    const renderField = ({ field }: RenderFieldFunc<TFieldValues, TName>) => (
        <FormItem>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <FormControl>
                <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
    return (
        <BaseFormField
            control={control}
            name={name}
            render={render || renderField}
            {...otherProps}
        />
    );
};
