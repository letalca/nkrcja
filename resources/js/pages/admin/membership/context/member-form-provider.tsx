import {
    IconAddressBook,
    IconBrandLinkedinFilled,
    IconMapPins,
    IconSchool,
    IconUser,
} from '@tabler/icons-react';
import { ElementType, FC, useCallback, useMemo, useState } from 'react';
import { MembershipFormContext, MembershipFormProviderProps } from './config';
import { FORM_CONFIGS } from './const';
import { FormType, MembershipFormContextProps } from './type';

export const MembershipFormProvider: FC<MembershipFormProviderProps> = (
    props,
) => {
    const [formType, setFormType] = useState<FormType>('personal');
    const [isFormDirty] = useState<boolean>(false);
    const { children, member } = props;

    const switchForm = useCallback(
        (form: FormType) => {
            if (isFormDirty) {
                // TODO: show some dialogue to confirm that form hasn't been saved
                return;
            }
            setFormType(form);
        },
        [setFormType, isFormDirty],
    );

    const getIcon = (form: FormType): JSX.Element => {
        let _icon: ElementType;
        switch (form) {
            case 'personal':
                _icon = IconUser;
                break;
            case 'education':
                _icon = IconSchool;
                break;
            case 'employment':
                _icon = IconBrandLinkedinFilled;
                break;
            case 'contact':
                _icon = IconAddressBook;
                break;
            case 'address':
                _icon = IconMapPins;
                break;
        }
        return <_icon size={18} />;
    };

    const navitems = useMemo(() => {
        return Object.entries(FORM_CONFIGS).map(([key, config]) => ({
            form: key as FormType,
            title: config.title,
            desc: config.description,
            icon: getIcon(key as FormType),
        }));
    }, []);

    const value: MembershipFormContextProps = useMemo(() => {
        return {
            member,
            formConfig: {
                setForm: switchForm,
                formType,
                forms: FORM_CONFIGS,
            },
            navItems: navitems,
        };
    }, [member, switchForm, formType, navitems]);
    return (
        <MembershipFormContext.Provider value={value}>
            {children}
        </MembershipFormContext.Provider>
    );
};
