import { ClubMember } from '@/types';
import { createContext, PropsWithChildren } from 'react';
import { MembershipFormContextProps } from './type';

export const MembershipFormContext = createContext<
    MembershipFormContextProps | undefined
>(undefined);

export interface MembershipFormProviderProps extends PropsWithChildren {
    member: ClubMember;
}
