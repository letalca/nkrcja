import { TabsContent } from '@/components/ui/tabs';
import { ClubMember } from '@/types';
import { FC } from 'react';
import { FieldValue } from './field-value';

export const BasicDetailsTab: FC<ClubMember> = (member) => {
    return (
        <TabsContent value="basic" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FieldValue label="Membership ID" value={`NKRC${member.id}`} />
                <FieldValue label="Rotary ID" value={member.rotary_id} />
                <FieldValue label="Email" canCopy value={member.email} />
                <FieldValue label="Phone" canCopy value={member.phone} />
                <FieldValue label="Gender" value={member.gender?.label} />
                <FieldValue
                    label="Date of Birth"
                    value={member.date_of_birth?.dateString}
                />
                <FieldValue
                    label="Age (July)"
                    value={
                        member.age.current
                            ? `${member.age.current} (${member.age.nextJuly})`
                            : null
                    }
                />
                {member.address && (
                    <FieldValue
                        label="Address"
                        longText={true}
                        value={member.address.displayString}
                    />
                )}
            </div>
        </TabsContent>
    );
};
