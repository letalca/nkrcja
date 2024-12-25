import ContentSection from '@/components/content-section';
import FormLayout from './components/form-layout';
import { PageProps } from './types';

export default function AddressForm({ data }: PageProps) {
    return (
        <FormLayout member={data} subtitle="Manage address information">
            <ContentSection
                title="Address Info"
                desc="Manage membership data and update preferences"
            >
                <></>
            </ContentSection>
        </FormLayout>
    );
}
