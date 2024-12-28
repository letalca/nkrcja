import ContentSection from '@/components/content-section';
import { Main } from '@/components/main';
import { PageHeader } from '@/components/page-header';
import Layout from '@/layouts/layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext } from '../context/form/use-form-context';
import AddressForm from './forms/address-form';
import ContactInfoForm from './forms/contact-info-form';
import EducationInfoForm from './forms/education-info-form';
import EmploymentForm from './forms/employment-form';
import PersonalDataForm from './forms/personal-data-form';
import ProfileImageUpload from './forms/profile-image-upload';
import SidebarNav from './side-bar-nav';

export default function FormLayout() {
    const {
        member,
        formConfig: { formType, forms },
    } = useFormContext();

    const renderForm = () => {
        if (formType === 'address') return <AddressForm />;
        if (formType === 'contact') return <ContactInfoForm />;
        if (formType === 'education') return <EducationInfoForm />;
        if (formType === 'employment') return <EmploymentForm />;
        if (formType === 'personal') return <PersonalDataForm />;
        if (formType === 'image') return <ProfileImageUpload />;
    };

    const slideAnimation = {
        initial: {
            opacity: 0,
            x: 20,
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.2,
                ease: 'easeIn',
            },
        },
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
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={formType}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={slideAnimation}
                                    className="w-full"
                                >
                                    {renderForm()}
                                </motion.div>
                            </AnimatePresence>
                        </ContentSection>
                    </div>
                </div>
            </Main>
        </Layout>
    );
}
