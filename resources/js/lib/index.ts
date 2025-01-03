import { MembershipStatus, MembershipType } from '@/types';

export const isCurrentRotaractor = ({
    type,
    status,
}: {
    type?: MembershipType;
    status?: MembershipStatus;
}): boolean => {
    if (!type || !status) return false;
    // eslint-disable-next-line prettier/prettier
    const activeTypes = ['Club Member', 'Honorary Member', 'Prospective Member'];
    const activeStatus = ['Active', 'Inactive', 'Leave of Absence'];
    return activeTypes.includes(type) && activeStatus.includes(status);
};
