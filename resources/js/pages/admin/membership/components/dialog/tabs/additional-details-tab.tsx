import { TabsContent } from '@/components/ui/tabs';
import { ClubMember } from '@/types';
import { FC } from 'react';
import { FieldValue } from './field-value';

export const AdditionalDetailsTab: FC<ClubMember> = (member) => {
    return (
        <TabsContent value="additional" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FieldValue label="Middle Name" value={member.middle_name} />
                <FieldValue label="Profession" value={member.profession} />
                <FieldValue label="Occupation" value={member.occupation} />
            </div>
        </TabsContent>
    );
};
