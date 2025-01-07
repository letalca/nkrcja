import { Button } from '@/components/button';
import { Form } from '@/components/ui/form';
import { handleFormErrors } from '@/lib/handle-form-errors';
import { ClubMember } from '@/types';
import { IconPlus } from '@tabler/icons-react';
import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useFormContext } from '../../context/form/use-form-context';
import { api } from './api';
import { FormAction } from './components/actions';
import { PhoneField } from './components/phone-field';
import { CellType, cellTypes, phoneResolver, Phones } from './schemas';

export default ContactInfoForm;

function ContactInfoForm() {
    const { member, setIsFormDirty, updateMember } = useFormContext();

    const getFormDefaults = useCallback(
        (member?: ClubMember): Phones => ({
            phones:
                member && member.phones?.length
                    ? member.phones.map((phone) => ({
                          number: phone.number,
                          primary: phone.primary,
                          type: phone.type as CellType,
                          whatsapp: Boolean(phone.whatsapp),
                      }))
                    : [
                          {
                              number: '',
                              primary: true,
                              type: 'cell',
                              whatsapp: false,
                          },
                      ],
        }),
        [],
    );

    const form = useForm<Phones>({
        resolver: phoneResolver,
        defaultValues: getFormDefaults(member),
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
                handleFormErrors(
                    errors,
                    getFormDefaults(member),
                    (key, message) => {
                        form.setError(key, { message });
                    },
                ),
        });
        if (clubMember) {
            resetForm(clubMember);
        }
    };

    const resetForm = (clubMember?: ClubMember) => {
        form.reset(getFormDefaults(clubMember));
        if (clubMember) {
            updateMember(clubMember);
        }
    };

    useEffect(() => {
        setIsFormDirty(form.formState.isDirty);
    }, [form.formState.isDirty, setIsFormDirty]);

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
                            onClick={() => {
                                phoneFields.append({
                                    number: '',
                                    primary: false,
                                    whatsapp: false,
                                    type: 'home',
                                });
                            }}
                            className="flex items-center gap-2"
                        >
                            <IconPlus className="h-4 w-4" />
                            Add Phone
                        </Button>
                    </div>

                    <div>
                        {phoneFields.fields.map((field, index) => (
                            <div key={field.id}>
                                <PhoneField
                                    onRemove={() => phoneFields.remove(index)}
                                    index={index}
                                    isRemovable={index > 0}
                                    cellTypes={
                                        cellTypes as unknown as CellType[]
                                    }
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    control={form.control as unknown as any}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <FormAction
                    reset={{
                        onClick: () => resetForm(),
                        disabled: !form.formState.isDirty,
                    }}
                    submit={{
                        disabled: !form.formState.isDirty,
                    }}
                />
            </form>
        </Form>
    );
}
