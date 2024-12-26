import { MembershipFormContext } from '@/pages/admin/membership/context/config';
import { useContext } from 'react';

export const useMembershipForm = () => {
    const context = useContext(MembershipFormContext);
    if (!context) {
        throw new Error(
            'useMembershipForm must be used within a MembershipFormContext',
        );
    }

    return context;
};
