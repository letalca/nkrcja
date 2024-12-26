'use client';
import FormLayout from './components/form-layout';
import { MembershipFormProvider } from './context/member-form-provider';
import { PageProps } from './types';

export default function MemberViewPage({ data: member }: PageProps) {
    return (
        <MembershipFormProvider member={member}>
            <div>
                <FormLayout />
            </div>
        </MembershipFormProvider>
    );
}
