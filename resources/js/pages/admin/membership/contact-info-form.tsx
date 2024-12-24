import ContentSection from '@/components/content-section';
import { ClubMember, PageProps } from '@/types';
import FormLayout from './components/form-layout';

type Props = PageProps & { data: ClubMember };

export default function ContactInfoForm({ data }: Props) {
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
