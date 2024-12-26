import {
    MembershipProviderContext,
    MembershipProviderContextProps,
} from '@/context/membership-provider-context';
import { useContext } from 'react';

export const useMembershipTable = (): MembershipProviderContextProps => {
    const context = useContext(MembershipProviderContext);
    if (!context) {
        throw new Error(
            'useMembershipTable must be within a MembershipProvider',
        );
    }

    return context;
};
