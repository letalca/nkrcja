'use client';
import { ClubMember, PageProps } from '@/types';
import FormLayout from './components/form-layout';
import { FormProvider } from './context/form/form-provider';

type Props = PageProps<{ data: ClubMember }>;
export default function MemberViewPage({ data: member }: Props) {
    return (
        <FormProvider member={member}>
            <FormLayout />
        </FormProvider>
    );
}
