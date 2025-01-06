import { useRouterQuery } from '@/context/router-query';
import { ClubMember, Filter, PaginatedProps } from '@/types';
import {
    ColumnDef,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table';
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

interface MembershipProviderContextProps {
    paginated: PaginatedProps;
    filters: Filter[];
    data: ClubMember[];
    table: Table<ClubMember>;
    columns: ColumnDef<ClubMember>[];
    pageSizes: readonly number[];
    nextPage: (url: string) => void;
    setPageSize: (size: string) => void;
    isTableFiltered: boolean;
    clearFilters: () => void;
    setSelectedFilters: (key: string, filters: string[]) => void;
    getSelectedFilters: (key: string) => string[];
    dialog?: DialogData | null;
    closeDialog: () => void;
    showDeleteConfirmation: (m: ClubMember) => void;
}

type FilterState = Record<string, string[]>;

export const MembershipProviderContext = createContext<
    MembershipProviderContextProps | undefined
>(undefined);

const DEFAULT_PAGE_SIZE = 20;
const AVAILABLE_PAGE_SIZES = [20, 30, 50] as const;

interface MembershipProviderProps extends PropsWithChildren {
    clubMembers: ClubMember[];
    filters: Filter[];
    paginate: PaginatedProps;
    columns: (view: (member: ClubMember) => void) => ColumnDef<ClubMember>[];
}

type DialogData = {
    dialog: 'delete' | 'profile';
    data: ClubMember;
};

export const MembershipProvider: FC<MembershipProviderProps> = (props) => {
    const { children, filters, paginate, clubMembers, columns } = props;
    const [dialog, setDialog] = useState<DialogData | null>(null);

    const { query, addQueries, addQuery, has, removeQueries, getQuery } =
        useRouterQuery();
    const [selectedFilterList, setSelectedFilterList] = useState<FilterState>(
        {},
    );

    const showDeleteConfirmation = useCallback((member: ClubMember) => {
        setDialog({ data: member, dialog: 'delete' });
    }, []);

    const showProfileDialog = useCallback((member: ClubMember) => {
        setDialog({ data: member, dialog: 'profile' });
    }, []);
    const closeDialog = useCallback(() => {
        setDialog(null);
    }, [setDialog]);

    useEffect(() => {
        const initialFilters = filters.reduce<FilterState>((acc, filter) => {
            const queryValue = getQuery(filter.filter_key);
            const filterValues: string[] = queryValue
                ? atob(queryValue).split(',')
                : [];
            return { ...acc, [filter.filter_key]: filterValues };
        }, {});
        setSelectedFilterList(initialFilters);
    }, [filters, getQuery]);

    const _columns: ColumnDef<ClubMember>[] = useMemo(
        () => columns(showProfileDialog),
        [columns, showProfileDialog],
    );

    const table = useReactTable({
        data: clubMembers,
        columns: _columns,
        enableRowSelection: false,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        initialState: {
            pagination: {
                pageSize: Number(query.perPage || DEFAULT_PAGE_SIZE),
            },
        },
    });

    const nextPage = useCallback(
        (url: string) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            const paramsObject = Object.fromEntries(urlParams.entries());
            addQueries(paramsObject);
        },
        [addQueries],
    );

    const setPageSize = useCallback(
        (size: string) => {
            table.setPageSize(Number(size));
            addQuery('perPage', size);
        },
        [table, addQuery],
    );

    const filterKeys = useMemo(
        () => [...filters.map((f) => f.filter_key), 'query'],
        [filters],
    );

    const isTableFiltered = has(filterKeys);

    const clearFilters = useCallback(() => {
        removeQueries(filterKeys);
        setSelectedFilterList({});
    }, [filterKeys, removeQueries]);

    const getSelectedFilters = useCallback(
        (key: string): string[] => selectedFilterList[key] || [],
        [selectedFilterList],
    );

    const setSelectedFilters = useCallback(
        (key: string, filters: string[]) => {
            setSelectedFilterList((prev) => ({
                ...prev,
                [key]: filters,
            }));

            addQuery(key, filters.length > 0 ? btoa(filters.join(',')) : '');
        },
        [addQuery],
    );

    const contextValue = useMemo(
        () => ({
            getSelectedFilters,
            columns: _columns,
            paginated: paginate,
            filters,
            data: clubMembers,
            table,
            pageSizes: AVAILABLE_PAGE_SIZES,
            nextPage,
            setPageSize,
            isTableFiltered,
            setSelectedFilters,
            clearFilters,
            showDeleteConfirmation,
            dialog,
            closeDialog,
        }),
        [
            getSelectedFilters,
            _columns,
            paginate,
            filters,
            clubMembers,
            table,
            nextPage,
            setPageSize,
            isTableFiltered,
            setSelectedFilters,
            clearFilters,
            showDeleteConfirmation,
            dialog,
            closeDialog,
        ],
    );

    return (
        <MembershipProviderContext.Provider value={contextValue}>
            {children}
        </MembershipProviderContext.Provider>
    );
};
