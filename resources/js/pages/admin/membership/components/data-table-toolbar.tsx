import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMembershipTable } from '@/hooks/use-membership-table';
import { useRouterQuery } from '@/hooks/use-router-query';
import { IconX } from '@tabler/icons-react';
import debounce from 'lodash/debounce';
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

const SEARCH_MIN_CHARS = 3;
const DEBOUNCE_DELAY = 300;

export function DataTableToolbar() {
    const { addQueries, getQuery } = useRouterQuery();
    const { filters, isTableFiltered, clearFilters } = useMembershipTable();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState(
        () => getQuery('query') || '',
    );

    const handleSearch = useCallback(
        (value: string) => {
            const currentQuery = getQuery('query');

            // Only call addQueries if:
            // 1. The search string is >= 3 characters OR
            // 2. There's an existing query and we're clearing it
            if (
                value.length >= SEARCH_MIN_CHARS ||
                (currentQuery && value === '')
            ) {
                const query = {
                    query: value,
                    ...(value.length >= SEARCH_MIN_CHARS && { page: '1' }),
                };
                addQueries(query);
            }
        },
        [addQueries, getQuery],
    );

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                handleSearch(value);
            }, DEBOUNCE_DELAY),
        [handleSearch],
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSearchValue(value);
        debouncedSearch(value);
    };

    const handleClearFilters = () => {
        clearFilters();
        setSearchValue('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const filterComponents = useMemo(
        () =>
            filters.map((filter, index) => (
                <DataTableFacetedFilter
                    key={`${filter.filter_key}-${index}`}
                    title={filter.name}
                    options={filter.options}
                    filter_key={filter.filter_key}
                />
            )),
        [filters],
    );

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleInputChange}
                    className="h-8 w-[150px] lg:w-[250px]"
                    aria-label="Search table"
                />
                <div className="flex gap-x-2">{filterComponents}</div>
                {isTableFiltered && (
                    <Button
                        variant="ghost"
                        onClick={handleClearFilters}
                        className="h-8 px-2 lg:px-3"
                        aria-label="Reset filters"
                    >
                        Reset
                        <IconX className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                )}
            </div>
        </div>
    );
}
