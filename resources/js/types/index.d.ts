export type UserRole =
    | 'executive'
    | 'chair'
    | 'member'
    | 'prospective'
    | 'admin';
export interface User {
    id: string;
    name: string;
    email: string;
}

export type ClubMember = {
    id: number;
    rotary_id?: string;
    name: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    gender: 'Male' | 'Female';
    membership_type:
        | 'Club Member'
        | 'Honorary Member'
        | 'Prospective Member'
        | 'Alumni';
    status:
        | 'Active'
        | 'Resigned'
        | 'Inactive'
        | 'Leave of Absence'
        | 'Termindated'
        | 'Resigned'; // Expand with all possible statuses
    is_in_good_standing: boolean;
    address?: string;
    date_of_birth?: string; // Assuming ISO 8601 format
    induction_date?: string;
    age?: number;
};

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

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedProps = {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export type PaginatedResponse<T> = {
    data: T[];
} & PaginatedProps;

export type FilterOptions = {
    id: string | number;
    label: string;
    value: string | number;
};

export type Filter = {
    name: string;
    options: FilterOptions[];
    order: number;
    filter_key: string;
};
