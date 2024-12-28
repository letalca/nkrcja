import { FC, useCallback, useMemo, useState } from 'react';
import {
    FormContext,
    FormContextProps,
    FormProviderProps,
    FormType,
    formTypeConfig,
} from './types';

export const FormProvider: FC<FormProviderProps> = (props) => {
    const { children, member: clubMember } = props;
    const [formType, setFormType] = useState<FormType>('personal');
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [member, setMember] = useState(clubMember);

    const navitems = useMemo(() => {
        return Object.entries(formTypeConfig).map(([key, config]) => ({
            form: key as FormType,
            title: config.title,
            desc: config.description,
            icon: <config.icon size={18} />,
        }));
    }, []);

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

    const value: FormContextProps = useMemo(() => {
        return {
            member,
            formConfig: {
                setForm: switchForm,
                formType,
                forms: formTypeConfig,
            },
            navItems: navitems,
            setIsFormDirty,
            updateMember: setMember,
        };
    }, [member, switchForm, formType, navitems]);

    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
};
