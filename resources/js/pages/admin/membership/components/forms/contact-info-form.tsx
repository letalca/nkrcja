import { Button } from '@/components/button';
import { SelectFormField } from '@/components/form-fields/select-form-field';
import { TextFormField } from '@/components/form-fields/text-form-field';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { handleFormErrors } from '@/lib/handle-form-errors';
import { ClubMember } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useFormContext } from '../../context/form/use-form-context';
import { api } from './api';
import { CellType, cellTypes, phoneResolver, Phones } from './schemas';

export default ContactInfoForm;

function ContactInfoForm() {
    const { member, setIsFormDirty, updateMember } = useFormContext();

    const getFormDefaults = (member: ClubMember): Phones => {
        if (!member.phones || member.phones.length === 0) {
            return {
                phones: [
                    {
                        number: '',
                        primary: true,
                        type: 'cell',
                        whatsapp: false,
                    },
                ],
            };
        }
        return {
            phones: member.phones?.map((phone) => {
                return {
                    number: phone.number,
                    primary: phone.primary,
                    type: phone.type as CellType,
                    whatsapp: Boolean(phone.whatsapp),
                };
            }),
        };
    };

    const defaultValues = getFormDefaults(member);
    const form = useForm<Phones>({
        resolver: phoneResolver,
        defaultValues,
    });

    const phoneFields = useFieldArray({
        name: 'phones',
        control: form.control,
    });

    const onSubmit = async (data: Phones) => {
        const clubMember = await api({
            data,
            form: 'contact',
            memberId: member.id,
            handleFormErrors: (errors: Record<string, string>) =>
                handleFormErrors(errors, defaultValues, (key, message) => {
                    form.setError(key, { message });
                }),
        });
        if (clubMember) {
            setIsFormDirty(false);
            form.reset(getFormDefaults(clubMember));
            updateMember(clubMember);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Phone Numbers</h2>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={phoneFields.fields.length === 4}
                            onClick={() =>
                                phoneFields.append({
                                    number: '',
                                    primary: false,
                                    whatsapp: false,
                                    type: 'home',
                                })
                            }
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Phone
                        </Button>
                    </div>

                    <AnimatePresence>
                        {phoneFields.fields.map((field, index) => (
                            <motion.div
                                onAnimationComplete={(definition) => {
                                    if (
                                        index ===
                                            phoneFields.fields.length - 1 &&
                                        typeof definition === 'object' &&
                                        definition !== null &&
                                        'id' in definition &&
                                        definition.id === 'exit-animation'
                                    ) {
                                        //TODO: this doesn't work if I reset the form
                                        phoneFields.remove(index);
                                    }
                                }}
                                key={field.id}
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                    id: 'initial-animation',
                                }}
                                animate={{
                                    opacity: 1,
                                    height: 'auto',
                                    id: 'current-animation',
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    id: 'exit-animation',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-4">
                                    {index > 0 && (
                                        <Separator className="my-4 flex-none" />
                                    )}
                                    <div className="mb-4 flex items-start justify-between">
                                        <h3 className="text-sm font-medium">
                                            Phone #{index + 1}
                                        </h3>
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    phoneFields.remove(index)
                                                }
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid gap-4">
                                        <TextFormField
                                            control={form.control}
                                            name={`phones.${index}.number`}
                                            placeholder="8763547211"
                                            label="Phone Number"
                                        />
                                        <SelectFormField
                                            label="Phone Type"
                                            control={form.control}
                                            name={`phones.${index}.type`}
                                            placeholder="Select a phone type"
                                            options={cellTypes.map((type) => {
                                                return {
                                                    value: type,
                                                    textValue:
                                                        type
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        type
                                                            .slice(1)
                                                            .toLowerCase(),
                                                };
                                            })}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`phones.${index}.whatsapp`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            WhatsApp Available
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Check if this number
                                                            can be reached via
                                                            WhatsApp.
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        disabled={
                            !form.formState.isDirty
                            // || !form.formState.isValid
                        }
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}
