import { TabsContent } from '@/components/ui/tabs';
import { ClubMember } from '@/types';
import { FC } from 'react';
import { FieldValue } from './field-value';

export const MembershipDetailsTab: FC<ClubMember> = (member) => {
    return (
        <TabsContent value="membership" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FieldValue label="Membership ID" value={`NKRC${member.id}`} />
                <FieldValue label="Rotary ID" value={member.rotary_id} />
                <FieldValue label="Type" value={member.membership_type.label} />
                <FieldValue
                    label="Stance"
                    value={
                        member.is_in_good_standing
                            ? 'Good Standing'
                            : 'Not in Good Standing'
                    }
                />
                <FieldValue label="Status" value={member.status?.label} />
                <FieldValue
                    label="Induction Date"
                    value={member.induction_date?.dateString}
                />
                <FieldValue label="Years active" value={member.years_active} />
                {member.current_club_position && (
                    <FieldValue
                        label="Club Position"
                        value={member.current_club_position}
                    />
                )}
                {member.current_district_position && (
                    <FieldValue
                        label="District Position"
                        value={member.current_district_position}
                    />
                )}
            </div>
        </TabsContent>
    );
};
