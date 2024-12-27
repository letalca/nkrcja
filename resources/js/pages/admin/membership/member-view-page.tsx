'use client';
import { ClubMember, PageProps } from '@/types';
import FormLayout from './components/form-layout';
import { MembershipFormProvider } from './context/member-form-provider';

type Props = PageProps<{ data: ClubMember }>;
export default function MemberViewPage({ data: member }: Props) {
    return (
        <MembershipFormProvider member={member}>
            <div>
                <FormLayout />
            </div>
        </MembershipFormProvider>
    );
}
