import { ClubMember } from '@/types';
import { FORM_CONFIGS, FORM_TYPES } from './const';

export type FormType = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];

export type Form = (typeof FORM_CONFIGS)[keyof typeof FORM_CONFIGS];

type FormConfig = {
    setForm: (form: FormType) => void;
    formType: FormType;
    forms: typeof FORM_CONFIGS;
};

export type NavItem = {
    form: FormType;
    title: Form['title'];
    desc: Form['description'];
    icon: JSX.Element;
};

export type MembershipFormContextProps = {
    member: ClubMember;
    formConfig: FormConfig;
    navItems: NavItem[];
};
