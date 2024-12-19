export type UserRole =
    | 'executive'
    | 'chair'
    | 'member'
    | 'prospective'
    | 'admin';
export interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        club: {
            name: string;
            zone: string;
            district: string;
            country: string;
            abbr: string;
        };
    };
};
