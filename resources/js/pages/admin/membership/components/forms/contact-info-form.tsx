import { Button } from '@/components/button';
import { TextFormField } from '@/components/form-fields/text-form-field';
import { Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormContext } from '../../context/form/use-form-context';
import { contactFormSchema } from './schemas';

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactInfoForm() {
    const { member } = useFormContext();

    const defaultValues: Partial<ContactFormValues> = {
        primary_phone: member.phone ?? '',
        primary_phone_whatsapp: false,
        secondary_phone: '',
        secondary_phone_whatsapp: false,
        primary_email: '',
        secondary_email: '',
    };

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues,
    });

    const onSubmit = async (data: ContactFormValues) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                        <TextFormField
                            control={form.control}
                            name="primary_phone"
                            label="Primary Phone"
                            placeholder="+1234567890"
                        />
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={form.watch('primary_phone_whatsapp')}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        'primary_phone_whatsapp',
                                        checked,
                                    )
                                }
                            />
                            <span className="text-sm text-gray-600">
                                This is a WhatsApp number
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <TextFormField
                            control={form.control}
                            name="secondary_phone"
                            label="Secondary Phone (Optional)"
                            placeholder="+1234567890"
                        />
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={form.watch('secondary_phone_whatsapp')}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        'secondary_phone_whatsapp',
                                        checked,
                                    )
                                }
                            />
                            <span className="text-sm text-gray-600">
                                This is a WhatsApp number
                            </span>
                        </div>
                    </div>

                    <TextFormField
                        control={form.control}
                        name="primary_email"
                        label="Primary Email"
                        placeholder="primary@example.com"
                    />

                    <TextFormField
                        control={form.control}
                        name="secondary_email"
                        label="Secondary Email (Optional)"
                        placeholder="secondary@example.com"
                    />
                </div>

                <div className="flex space-x-4">
                    <Button
                        type="submit"
                        disabled={
                            !form.formState.isDirty //|| !form.formState.isValid
                        }
                    >
                        Save Changes
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        // onClick={onReset}
                        disabled={!form.formState.isDirty}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    );
}
