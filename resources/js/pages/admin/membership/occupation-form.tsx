import ContentSection from '@/components/content-section';
import FormLayout from './components/form-layout';
import { PageProps } from './types';

export default function OccupationForm({ data }: PageProps) {
    return (
        <FormLayout
            member={data}
            subtitle="Manage email address and phone contact"
        >
            <ContentSection
                title="Occupation Info"
                desc="Manage membership data and update preferences"
            >
                <></>
            </ContentSection>
        </FormLayout>
    );
}
