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

type SelectField<T extends string = string> = {
    value: string;
    label: T;
};

type MembershipType =
    | 'Club Member'
    | 'Honorary Member'
    | 'Prospective Member'
    | 'Alumni';

type MembershipStatus =
    | 'Active'
    | 'Resigned'
    | 'Inactive'
    | 'Leave of Absence'
    | 'Termindated'
    | 'Resigned';

export type ClubMember = {
    images?: {
        medium?: string | null;
        original?: string | null;
        thumb?: string | null;
    };
    id: number;
    rotary_id?: string;
    name: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    gender?: SelectField;
    membership_type: SelectField<MembershipType>;
    status?: SelectField<MembershipStatus>;
    is_in_good_standing: boolean;
    address?: string;
    date_of_birth?: string;
    induction_date?: string;
    age?: number;
};

type ConfigProps<T> = T & object;

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
    U extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    error: object;
    auth: {
        user: User;
    };
    config: ConfigProps<U>;
    club: {
        name: string;
        zone: string;
        district: string;
        country: string;
        abbr: string;
        email: string;
    };
};

export type ResponseWithMessage<
    T extends Record<string, unknown> = Record<string, unknown>,
> = PageProps<T, unknown> & {
    flash:
        | {
              message: string;
              has_error: false;
          }
        | {
              error: string;
              has_error: true;
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
