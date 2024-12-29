import { DateFormField } from '@/components/form-fields/date-form-field';
import { SelectFormField } from '@/components/form-fields/select-form-field';
import { TextFormField } from '@/components/form-fields/text-form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { handleServerError } from '@/lib/utils';
import { ClubMember, ResponseWithMessage } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormContext } from '../../context/form/use-form-context';
import { personalFormSchema } from './schemas';

type PersonalFormValues = z.infer<typeof personalFormSchema>;

export default function PersonalDataForm() {
    const { member, statuses, types, genders, updateMember, setIsFormDirty } =
        useFormContext();

    const getDefaultValues = (clubMember: ClubMember) => {
        return {
            first_name: clubMember.first_name ?? '',
            last_name: clubMember.last_name ?? '',
            middle_name: clubMember.middle_name ?? '',
            rotary_id: clubMember.rotary_id ?? '',
            gender: clubMember.gender?.value.toString() ?? '',
            membership_type: clubMember.membership_type.value.toString() ?? '',
            status: clubMember.status?.value.toString() ?? '',
            date_of_birth: clubMember.date_of_birth
                ? new Date(clubMember.date_of_birth)
                : undefined,
            induction_date: clubMember.induction_date
                ? new Date(clubMember.induction_date)
                : undefined,
            is_in_good_standing: clubMember.is_in_good_standing,
        };
    };

    const defaultValues: Partial<PersonalFormValues> = getDefaultValues(member);

    const form = useForm<PersonalFormValues>({
        resolver: zodResolver(personalFormSchema),
        defaultValues,
    });

    const handleError = (error: unknown) => {
        console.log(error);
        if (typeof error === 'object' && error && 'message' in error) {
            toast({
                title: 'Error',
                description: (
                    <div>
                        <span className="text-white">
                            Failed to update personal information.
                        </span>
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {JSON.stringify(error)}
                            </code>
                        </pre>
                    </div>
                ),
                variant: 'destructive',
            });
        } else {
            handleServerError(error);
        }
    };

    async function onSubmit(data: PersonalFormValues) {
        await new Promise<void>((res) => {
            router.post(
                route('members.save', {
                    memberId: member.id,
                    form: 'personal',
                }),
                data,
                {
                    onError: handleError,
                    onSuccess: (response) => {
                        const props =
                            response.props as unknown as ResponseWithMessage<{
                                data: ClubMember;
                            }>;

                        const flash = props.flash;
                        if (flash.has_error === true) {
                            toast({
                                variant: 'destructive',
                                description: flash.error,
                            });
                        } else {
                            toast({
                                variant: 'success',
                                description: flash.message,
                            });
                        }
                        updateMember(props.data);
                        form.reset(getDefaultValues(props.data));
                    },
                    onFinish: () => {
                        setIsFormDirty(false);
                        res();
                    },
                },
            );
        });
    }

    const isFormValid = form.formState.isValid;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TextFormField
                        control={form.control}
                        name="first_name"
                        placeholder="Service"
                        label="First Name"
                    />
                    <TextFormField
                        control={form.control}
                        name="last_name"
                        placeholder="Ninja"
                        label="Last Name"
                    />
                    <TextFormField
                        control={form.control}
                        name="middle_name"
                        placeholder="Middle Name (optional)"
                        label="Middle Name"
                    />
                    <TextFormField
                        control={form.control}
                        name="rotary_id"
                        placeholder="Rotary ID (optional)"
                        label="Rotary ID"
                        disabled={Boolean(member.rotary_id)}
                    />

                    <SelectFormField
                        control={form.control}
                        name="gender"
                        label="Gender"
                        placeholder="Select Gender"
                        options={genders.map((gender) => ({
                            value: gender.value.toString(),
                            textValue: gender.label,
                            disabled: false,
                        }))}
                    />
                    <SelectFormField
                        control={form.control}
                        name="membership_type"
                        label="Membership Type"
                        placeholder="Select Membership Type"
                        options={types.map((type) => ({
                            value: type.value.toString(),
                            textValue: type.label,
                            disabled: false,
                        }))}
                    />

                    <DateFormField
                        control={form.control}
                        placeholder="Pick a date (Optional)"
                        name="date_of_birth"
                        label="Date of Birth"
                        disabled={Boolean(member.date_of_birth)}
                    />
                    <DateFormField
                        control={form.control}
                        placeholder="Pick a date (Optional)"
                        name="induction_date"
                        label="Induction Date"
                        disabled={Boolean(member.induction_date)}
                    />

                    <SelectFormField
                        control={form.control}
                        name="status"
                        label="Status"
                        placeholder="Select Status"
                        options={statuses.map((status) => ({
                            value: status.value.toString(),
                            textValue: status.label,
                            disabled: false,
                        }))}
                    />
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
                        disabled={!form.formState.isDirty || !isFormValid}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}
