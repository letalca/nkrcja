import NkrcCommunityLogo from '@/assets/nkrc-community-logo.png';
import CopyToClipboard from '@/components/copy-to-clipboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn, formatDate, getInitials } from '@/lib/utils';
import { ClubMember } from '@/types';
import { IconUsersGroup } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<ClubMember>[] = [
    {
        accessorKey: 'fullName',
        header: () => <div>Name</div>,
        cell: ({ row }) => (
            <div className="flex flex-row items-center text-nowrap">
                <Avatar className="mr-6 size-8 rounded-lg">
                    <AvatarImage
                        src={NkrcCommunityLogo}
                        alt={row.original.name}
                    />
                    <AvatarFallback className="rounded-lg">
                        {getInitials(row.original.name)}
                    </AvatarFallback>
                </Avatar>
                {row.original.name}
            </div>
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
                <CopyToClipboard textToCopy={row.original.email} />
            </div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: 'phone',
        header: () => <div>Phone Number</div>,
        cell: ({ row }) => (
            <div>
                <CopyToClipboard textToCopy={row.original.phone} />
            </div>
        ),
        enableSorting: false,
    },
    {
        id: 'inductionDate',
        header: () => <div>Induction Date</div>,
        cell: ({ row }) =>
            row.original.induction_date
                ? formatDate(row.original.induction_date)
                : '-',
    },
    {
        accessorKey: 'status',
        header: () => <div>Membership Status</div>,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <Badge
                        variant="outline"
                        className={cn(
                            'capitalize',
                            'border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200',
                        )}
                    >
                        {row.original.status}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, columnId, filterValue: string[], addMeta) => {
            addMeta({ filterType: 'partial' });
            // console.log(columnId, filterValue);
            return filterValue.includes(row.original.status.toLowerCase());
            // return true;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'membership_type',
        header: () => <div>Membership Type</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-x-2">
                    <IconUsersGroup
                        size={16}
                        className="text-muted-foreground"
                    />
                    <span className="text-sm capitalize">
                        {row.getValue('membership_type')}
                    </span>
                </div>
            );
        },
        filterFn: 'weakEquals',
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
