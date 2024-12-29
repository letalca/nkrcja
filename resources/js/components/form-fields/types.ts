import {
    ControllerFieldState,
    ControllerProps,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    UseFormStateReturn,
} from 'react-hook-form';

export type RenderFieldFunc<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
};

export type FieldControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'>;

export type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = FieldControllerProps<TFieldValues, TName> & {
    label?: string;
    placeholder?: string;
    render?: (
        props: RenderFieldFunc<TFieldValues, TName>,
    ) => React.ReactElement;
};
