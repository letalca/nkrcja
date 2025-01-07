import { DateFormField } from '@/components/form-fields/date-form-field';
import { SelectFormField } from '@/components/form-fields/select-form-field';
import { TextFormField } from '@/components/form-fields/text-form-field';
import { Form } from '@/components/ui/form';
import { handleFormErrors } from '@/lib/handle-form-errors';
import { ClubMember } from '@/types';
import { useForm } from 'react-hook-form';
import { useFormContext } from '../../context/form/use-form-context';
import { api } from './api';
import { FormAction } from './components/actions';
import { type PersonalDataForm, personalDataResolver } from './schemas';

export default function PersonalDataForm() {
    const { member, statuses, types, genders, updateMember, setIsFormDirty } =
        useFormContext();

    const getDefaultValues = (clubMember: ClubMember) => {
        return {
            email: clubMember.email ?? '',
            first_name: clubMember.first_name ?? '',
            last_name: clubMember.last_name ?? '',
            middle_name: clubMember.middle_name ?? '',
            rotary_id: clubMember.rotary_id ?? '',
            gender: clubMember.gender?.value.toString() ?? '',
            membership_type: clubMember.membership_type.value.toString() ?? '',
            status: clubMember.status?.value.toString() ?? '',
            date_of_birth: clubMember.date_of_birth
                ? new Date(clubMember.date_of_birth.date)
                : undefined,
            induction_date: clubMember.induction_date
                ? new Date(clubMember.induction_date.date)
                : undefined,
            is_in_good_standing: clubMember.is_in_good_standing,
        };
    };

    const defaultValues = getDefaultValues(member);

    const form = useForm<PersonalDataForm>({
        resolver: personalDataResolver,
        defaultValues,
    });

    async function onSubmit(data: PersonalDataForm) {
        const clubMember = await api({
            data,
            form: 'personal',
            memberId: member.id,
            handleFormErrors: (errors: Record<string, string>) =>
                handleFormErrors(errors, defaultValues, (key, message) => {
                    form.setError(key, { message: message });
                }),
        });
        if (clubMember) {
            updateMember(clubMember);
            form.reset(getDefaultValues(clubMember));
            setIsFormDirty(false);
        }
    }

    // const isFormValid = form.formState.isValid;

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
                        name="email"
                        placeholder="serviceninja@nkrcja.com"
                        label="Email Address"
                        disabled={Boolean(member.email)}
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
                        maxYear={new Date().getFullYear() - 10}
                        minYear={1980}
                        disabledDate={(d) =>
                            d.getFullYear() > new Date().getFullYear() - 10
                        }
                    />
                    <DateFormField
                        control={form.control}
                        placeholder="Pick a date (Optional)"
                        name="induction_date"
                        label="Induction Date"
                        disabled={Boolean(member.induction_date)}
                        disabledDate={(d) => d > new Date()}
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
                <FormAction
                    reset={{
                        onClick: () => form.reset(),
                        disabled: !form.formState.isDirty,
                    }}
                    submit={{ disabled: !form.formState.isDirty }}
                />
            </form>
        </Form>
    );
}
