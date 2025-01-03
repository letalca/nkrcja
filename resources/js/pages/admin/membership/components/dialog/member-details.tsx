import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isCurrentRotaractor } from '@/lib';
import { getInitials } from '@/lib/utils';
import { ClubMember } from '@/types';
import { Link } from '@inertiajs/react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
    IconBriefcase,
    IconEdit,
    IconGenderBigender,
    IconGenderFemale,
    IconGenderMale,
    IconInfoCircle,
    IconTrashFilled,
    IconUser,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AdditionalDetailsTab } from './tabs/additional-details-tab';
import { BasicDetailsTab } from './tabs/basic-details-tab';
import { MembershipDetailsTab } from './tabs/membership-details-tab';

interface MemberDetailsDialogProps {
    member: ClubMember;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete?: () => void;
}

const tabVariants = {
    enter: {
        y: 20,
        opacity: 0,
    },
    center: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: -20,
        opacity: 0,
    },
};

const MemberDetailsDialog = ({
    member,
    open,
    onOpenChange,
    onDelete,
}: MemberDetailsDialogProps) => {
    const [activeTab, setActiveTab] = useState<string>('basic');
    const title = member.current_club_position
        ? member.current_club_position
        : isCurrentRotaractor({
                type: member.membership_type.label,
                status: member.status?.label,
            })
          ? 'Rotaractor'
          : 'Past Rotaractor';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-hidden">
                <DialogHeader>
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div>
                            <DialogTitle className="text-xl">
                                Membership Details
                            </DialogTitle>
                            <VisuallyHidden asChild>
                                <DialogDescription />
                            </VisuallyHidden>
                        </div>
                    </motion.div>
                </DialogHeader>

                <div className="grid gap-6">
                    <motion.div
                        className="mb-6 flex items-center justify-between"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center space-x-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Avatar className="h-16 w-16">
                                    <AvatarImage
                                        src={member.images?.thumb || ''}
                                        alt={member.name}
                                    />
                                    <AvatarFallback>
                                        {getInitials(member.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {title}
                                </p>
                                <div className="flex items-center gap-x-1">
                                    <h2 className="text-2xl font-bold">
                                        {member.name}
                                    </h2>
                                    {member.gender?.label === 'Male' ? (
                                        <IconGenderMale />
                                    ) : member.gender?.label === 'Female' ? (
                                        <IconGenderFemale />
                                    ) : (
                                        <IconGenderBigender />
                                    )}
                                </div>
                                <p
                                    className={`${member.occupation ? 'text-sm' : 'text-xs'} text-muted-foreground`}
                                >
                                    {member.occupation ||
                                        '(No occupation listed)'}
                                </p>
                                <Badge
                                    className="mt-2"
                                    variant={
                                        member.is_in_good_standing
                                            ? 'default'
                                            : 'destructive'
                                    }
                                >
                                    {member.is_in_good_standing
                                        ? 'Good Standing'
                                        : 'Not in Good Standing'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link
                                    className={buttonVariants({
                                        size: 'icon',
                                        variant: 'ghost',
                                    })}
                                    href={route('members.form', {
                                        memberId: `${member.id}`,
                                    })}
                                >
                                    <IconEdit className="h-4 w-4 text-primary" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onDelete}
                                >
                                    <IconTrashFilled className="h-4 w-4 text-destructive" />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basic">
                                <IconUser className="mr-2 h-4 w-4" /> Basic
                            </TabsTrigger>
                            <TabsTrigger value="membership">
                                <IconBriefcase className="mr-2 h-4 w-4" />{' '}
                                Membership
                            </TabsTrigger>
                            <TabsTrigger disabled value="additional">
                                <IconInfoCircle className="mr-2 h-4 w-4" />{' '}
                                Additional
                            </TabsTrigger>
                        </TabsList>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                variants={tabVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'basic' && (
                                    <BasicDetailsTab {...member} />
                                )}
                                {activeTab === 'membership' && (
                                    <MembershipDetailsTab {...member} />
                                )}
                                {activeTab === 'additional' && (
                                    <AdditionalDetailsTab {...member} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MemberDetailsDialog;
