import ContentSection from '@/components/content-section';
import { ClubMember, PageProps } from '@/types';
import FormLayout from './components/form-layout';

type Props = PageProps & { data: ClubMember };

export default function AddressForm({ data }: Props) {
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
