import { useContext } from 'react';
import {
    MembershipProvider,
    MembershipProviderContext,
} from './membership-provider';

const useMembershipProvider = () => {
    const context = useContext(MembershipProviderContext);
    if (!context) {
        throw new Error(
            'useMembershipProvider must be within a MembershipProvider',
        );
    }

    return context;
};

export { MembershipProvider, useMembershipProvider };
