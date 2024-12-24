import ContentSection from '@/components/content-section';
import { ClubMember, PageProps } from '@/types';
import FormLayout from './components/form-layout';

type Props = PageProps & { data: ClubMember };

export default function EducationInfoForm({ data }: Props) {
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
