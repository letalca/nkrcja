export const FORM_TYPES = {
    PERSONAL: 'personal',
    CONTACT: 'contact',
    ADDRESS: 'address',
    EDUCATION: 'education',
    EMPLOYMENT: 'employment',
    IMAGE: 'image',
} as const;

export const FORM_CONFIGS = {
    [FORM_TYPES.PERSONAL]: {
        title: 'Personal Info',
        description: 'Manage membership personal information',
    },
    [FORM_TYPES.IMAGE]: {
        title: 'Profile Image',
        description: 'Upload an image for this member',
    },
    [FORM_TYPES.CONTACT]: {
        title: 'Contact Info',
        description: 'Manage contact information',
    },
    [FORM_TYPES.ADDRESS]: {
        title: 'Address Info',
        description: 'Manage address details',
    },
    [FORM_TYPES.EDUCATION]: {
        title: 'Education Info',
        description: 'Manage education details',
    },
    [FORM_TYPES.EMPLOYMENT]: {
        title: 'Employment Info',
        description: 'Manage employment information',
    },
} as const;
