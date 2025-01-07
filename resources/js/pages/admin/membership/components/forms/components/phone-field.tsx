import { Button } from '@/components/button';
import { SelectFormField } from '@/components/form-fields/select-form-field';
import { TextFormField } from '@/components/form-fields/text-form-field';
import { FormFieldProps } from '@/components/form-fields/types';
import { Checkbox } from '@/components/ui/checkbox';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { IconTrash } from '@tabler/icons-react';
import { FC } from 'react';
import { CellType } from '../schemas';

type PhoneFieldProps = {
    index: number;
    control: FormFieldProps['control'];
    onRemove: () => void;
    isRemovable: boolean;
    cellTypes: CellType[];
};
export const PhoneField: FC<PhoneFieldProps> = ({
    control,
    index,
    isRemovable,
    onRemove,
    cellTypes,
}) => {
    console.log('Rendering animated Phone Field', index);
    return (
        <div className="p-4">
            {index > 0 && <Separator className="my-4 flex-none" />}
            <div className="mb-4 flex items-start justify-between">
                <h3 className="text-sm font-medium">Phone #{index + 1}</h3>
                {isRemovable && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700"
                    >
                        <IconTrash className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="grid gap-4">
                <TextFormField
                    control={control}
                    name={`phones.${index}.number`}
                    placeholder="8763547211"
                    label="Phone Number"
                />
                <SelectFormField
                    label="Phone Type"
                    control={control}
                    name={`phones.${index}.type`}
                    placeholder="Select a phone type"
                    options={cellTypes.map((type) => ({
                        value: type,
                        textValue:
                            type.charAt(0).toUpperCase() +
                            type.slice(1).toLowerCase(),
                    }))}
                />
                <FormField
                    control={control}
                    name={`phones.${index}.whatsapp`}
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>WhatsApp Available</FormLabel>
                                <FormDescription>
                                    Check if this number can be reached via
                                    WhatsApp.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};
