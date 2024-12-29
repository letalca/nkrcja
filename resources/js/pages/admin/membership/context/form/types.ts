import { ClubMember, FilterOptions } from '@/types';
import {
    IconAddressBook,
    IconBrandLinkedinFilled,
    IconImageInPicture,
    IconMapPins,
    IconSchool,
    IconUser,
} from '@tabler/icons-react';
import { ElementType, PropsWithChildren, createContext } from 'react';

type FormTypeConfigMap = {
    [key in FormType]: {
        title: string;
        description: string;
        icon: ElementType;
    };
};

export const formTypeConfig: FormTypeConfigMap = {
    personal: {
        title: 'Personal Info',
        description: 'Manage membership personal information',
        icon: IconUser,
    },
    image: {
        title: 'Profile Image',
        description: 'Upload an image for this member',
        icon: IconImageInPicture,
    },
    contact: {
        title: 'Contact Info',
        description: 'Manage contact information',
        icon: IconAddressBook,
    },
    address: {
        title: 'Address Info',
        description: 'Manage address details',
        icon: IconMapPins,
    },
    education: {
        title: 'Education Info',
        description: 'Manage education details',
        icon: IconSchool,
    },
    employment: {
        title: 'Employment Info',
        description: 'Manage employment information',
        icon: IconBrandLinkedinFilled,
    },
} as const;

export type FormType =
    | 'personal'
    | 'contact'
    | 'address'
    | 'education'
    | 'employment'
    | 'image';

export type Form = (typeof formTypeConfig)[keyof typeof formTypeConfig];

type FormConfig = {
    setForm: (form: FormType) => void;
    formType: FormType;
    forms: typeof formTypeConfig;
};

export type NavItem = {
    form: FormType;
    title: Form['title'];
    desc: Form['description'];
    icon: JSX.Element;
};

export type FormContextProps = {
    member: ClubMember;
    formConfig: FormConfig;
    updateMember: (member: ClubMember) => void;
    navItems: NavItem[];
    setIsFormDirty: (state: boolean) => void;
    statuses: FilterOptions[];
    types: FilterOptions[];
    genders: FilterOptions[];
};

export const FormContext = createContext<FormContextProps | undefined>(
    undefined,
);

export type FormProviderProps = PropsWithChildren & {
    member: ClubMember;
    membershipStatuses: FilterOptions[];
    membershipTypes: FilterOptions[];
    genders: FilterOptions[];
};
