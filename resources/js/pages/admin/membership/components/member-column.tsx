import { MembershipStatus, MembershipType } from '@/components/badge';
import { Button } from '@/components/button';
import CopyToClipboard from '@/components/copy-to-clipboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, getInitials } from '@/lib/utils';
import { ClubMember } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns = (
    view: (member: ClubMember) => void,
): ColumnDef<ClubMember>[] => [
    {
        accessorKey: 'fullName',
        header: () => <div>Name</div>,
        cell: ({ row }) => (
            <Button
                onClick={() => view(row.original)}
                variant={'ghost'}
                className="flex flex-row items-center text-nowrap"
            >
                <Avatar className="mr-6 size-8 rounded-lg">
                    <AvatarImage
                        src={row.original.images?.thumb ?? undefined}
                        alt={row.original.name}
                    />
                    <AvatarFallback className="rounded-lg">
                        {getInitials(row.original.name)}
                    </AvatarFallback>
                </Avatar>
                {row.original.name}
            </Button>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-0 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky md:table-cell',
            ),
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        accessorKey: 'email',
        header: () => <div>Email</div>,
        cell: ({ row }) => (
            <div className="w-fit text-nowrap">
                <CopyToClipboard
                    showCopiedMessage
                    textToCopy={row.original.email}
                />
            </div>
        ),
        enableHiding: false,
        enableSorting: false,
    },
    {
        accessorKey: 'phone',
        header: () => <div>Phone Number</div>,
        cell: ({ row }) =>
            row.original.phone ? (
                <div>
                    <CopyToClipboard
                        showCopiedMessage
                        textToCopy={row.original.phone}
                    />
                </div>
            ) : null,
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'inductionDate',
        header: () => <div>Induction Date</div>,
        cell: ({ row }) =>
            row.original.induction_date
                ? row.original.induction_date.dateString
                : '-',
    },
    {
        accessorKey: 'status',
        header: () => <div>Membership Status</div>,
        cell: ({ row }) => {
            return (
                <MembershipStatus
                    status={row.original.status?.label ?? 'Inactive'}
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'membership_type',
        header: () => <div>Membership Type</div>,
        cell: ({ row }) => {
            return <MembershipType type={row.original.membership_type.label} />;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
