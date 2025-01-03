import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { ClubMember } from '@/types';
import { IconAlertTriangle } from '@tabler/icons-react';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    clubMember: ClubMember;
}

export function DeleteConfirmation({ open, onOpenChange, clubMember }: Props) {
    const handleDelete = () => {
        onOpenChange(false);
        toast({
            title: 'The following user has been deleted:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(clubMember, null, 2)}
                    </code>
                </pre>
            ),
        });
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            title={
                <span className="text-destructive">
                    <IconAlertTriangle
                        className="mr-1 inline-block stroke-destructive"
                        size={18}
                    />{' '}
                    Delete Membership Data
                </span>
            }
            desc={
                <div className="space-y-4">
                    <p className="mb-2">
                        Are you sure you want to delete{' '}
                        <span className="font-bold">
                            {clubMember.name || clubMember.email}
                        </span>
                        's data?
                        <br />
                        This action will permanently remove all data relating to
                        this{' '}
                        <span className="font-bold">
                            {clubMember.membership_type.label}
                        </span>{' '}
                        from the system. This cannot be undone.
                    </p>
                    <Alert variant="destructive">
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            Please be carefull, this operation can not be rolled
                            back.
                        </AlertDescription>
                    </Alert>
                </div>
            }
            confirmText="Delete"
            destructive
        />
    );
}
