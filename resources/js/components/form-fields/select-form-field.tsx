import {
    FormField as BaseFormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormFieldProps, RenderFieldFunc } from './types';

type SelectOption = {
    value: string;
    disabled?: boolean;
    textValue?: string;
};

export const SelectFormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: FormFieldProps<TFieldValues, TName> & { options: SelectOption[] },
) => {
    const {
        render,
        name,
        label,
        disabled,
        placeholder = 'Select',
        control,
        options,
        ...otherProps
    } = props;

    const renderField = ({ field }: RenderFieldFunc<TFieldValues, TName>) => (
        <FormItem>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
                disabled={disabled}
            >
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {options.map((option, index) => {
                        return (
                            <SelectItem
                                {...option}
                                key={`${option.value}-${index}`}
                            >
                                {option.textValue || option.value}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
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
