import ContentSection from '@/components/content-section';
import FormLayout from './components/form-layout';
import { PageProps } from './types';

export default function ContactInfoForm({ data }: PageProps) {
    return (
        <FormLayout
            member={data}
            subtitle="Manage email address and phone contact"
        >
            <ContentSection
                title="Contact Info"
                desc="Manage membership data and update preferences"
            >
                <></>
            </ContentSection>
        </FormLayout>
    );
}
