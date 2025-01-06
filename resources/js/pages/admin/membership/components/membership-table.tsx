import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useMembershipProvider } from '@/context/membership';
import { flexRender } from '@tanstack/react-table';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { DeleteConfirmation } from './dialog/delete-confirmation';
import MemberDetailsDialog from './dialog/member-details';

export function MembershipTable() {
    const { table, columns, dialog, closeDialog, showDeleteConfirmation } =
        useMembershipProvider();

    return (
        <>
            <div className="space-y-4">
                <DataTableToolbar />
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="group/row"
                                >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className={
                                                    header.column.columnDef.meta
                                                        ?.className ?? ''
                                                }
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                        className="group/row"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={
                                                    cell.column.columnDef.meta
                                                        ?.className ?? ''
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination />
            </div>
            {dialog?.dialog === 'profile' && (
                <MemberDetailsDialog
                    key={`member-profile-${dialog.data.id}`}
                    member={dialog.data}
                    open={true}
                    onOpenChange={closeDialog}
                    // onEdit={handleEdit}
                    onDelete={() => showDeleteConfirmation(dialog.data)}
                />
            )}
            {dialog?.dialog === 'delete' && (
                <DeleteConfirmation
                    key={`member-delete-${dialog.data.id}`}
                    open={true}
                    onOpenChange={closeDialog}
                    clubMember={dialog.data}
                />
            )}
        </>
    );
}
