import { ClubMember, PageProps as Props } from '@/types';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = Props<{ data: ClubMember }, T>;
