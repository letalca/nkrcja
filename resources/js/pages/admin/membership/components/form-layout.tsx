import ContentSection from '@/components/content-section';
import { Main } from '@/components/main';
import { PageHeader } from '@/components/page-header';
import { useMembershipForm } from '@/hooks/use-membership-form';
import Layout from '@/layouts/layout';
import AddressForm from './forms/address-form';
import ContactInfoForm from './forms/contact-info-form';
import EducationInfoForm from './forms/education-info-form';
import EmploymentForm from './forms/employment-form';
import PersonalDataForm from './forms/personal-data-form';
import SidebarNav from './side-bar-nav';

export default function FormLayout() {
    const {
        member,
        formConfig: { formType, forms },
    } = useMembershipForm();
    const renderForm = () => {
        if (formType === 'address') return <AddressForm />;
        if (formType === 'contact') return <ContactInfoForm />;
        if (formType === 'education') return <EducationInfoForm />;
        if (formType === 'employment') return <EmploymentForm />;
        if (formType === 'personal') return <PersonalDataForm />;
    };
    return (
        <Layout>
            <Main fixed>
                <PageHeader
                    title={member.name}
                    subTitle="Manage membership data and update preferences"
                />
                <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="top-0 lg:sticky lg:w-1/5">
                        <SidebarNav />
                    </aside>
                    <div className="flex w-full overflow-y-hidden p-1 pr-4">
                        <ContentSection
                            title={forms[formType].title}
                            desc={forms[formType].description}
                        >
                            {renderForm()}
                        </ContentSection>
                    </div>
                </div>
            </Main>
        </Layout>
    );
}
