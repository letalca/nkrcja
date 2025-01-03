import { Badge } from '@/components/ui/badge';
import {
    type MembershipStatus as MS,
    type MembershipType as MT,
} from '@/types';

const MembershipType = ({ type }: { type: MT }) => {
    const variant = [
        'Club Member',
        'Honorary Member',
        'Prospective Member',
    ].includes(type)
        ? 'default'
        : 'outline';
    return (
        <Badge variant={variant}>
            <span>{type}</span>
        </Badge>
    );
};

const MembershipStatus = ({ status }: { status: MS }) => {
    const variant = ['Active', 'Leave of Absence', 'LOA'].includes(status)
        ? 'default'
        : ['Inactive', 'Terminated'].includes(status)
          ? 'secondary'
          : 'outline';
    return <Badge variant={variant}>{status}</Badge>;
};

export { MembershipStatus, MembershipType };
