import ContentSection from '@/components/content-section';
import FormLayout from './components/form-layout';
import { PageProps } from './types';

export default function PersonalDataForm({ data }: PageProps) {
    return (
        <FormLayout
            member={data}
            subtitle="Manage membership data and update preferences"
        >
            <ContentSection
                title="Personal Data"
                desc="Manage membership data and update preferences"
            >
                <></>
            </ContentSection>
        </FormLayout>
    );
}
