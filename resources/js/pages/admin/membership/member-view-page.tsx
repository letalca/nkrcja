'use client';
import { ClubMember, FilterOptions, PageProps } from '@/types';
import FormLayout from './components/form-layout';
import { FormProvider } from './context/form/form-provider';

type Props = PageProps<
    { data: ClubMember },
    {
        status: FilterOptions[];
        type: FilterOptions[];
        gender: FilterOptions[];
    }
>;
export default function MemberViewPage({
    data: member,
    config: { status, type, gender },
}: Props) {
    return (
        <FormProvider
            member={member}
            membershipStatuses={status}
            membershipTypes={type}
            genders={gender}
        >
            <FormLayout />
        </FormProvider>
    );
}
