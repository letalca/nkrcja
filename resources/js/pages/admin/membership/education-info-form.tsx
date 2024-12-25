import ContentSection from '@/components/content-section';
import FormLayout from './components/form-layout';
import { PageProps } from './types';

export default function EducationInfoForm({ data }: PageProps) {
    return (
        <FormLayout member={data} subtitle="Manage Education details">
            <ContentSection
                title="Education Info"
                desc="Manage membership data and update preferences"
            >
                <></>
            </ContentSection>
        </FormLayout>
    );
}
