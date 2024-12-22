import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouterQuery } from '@/context/router-query-context';
import { Filter } from '@/types';
import { IconX } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';
import debounce from 'lodash/debounce';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filters: Filter[];
}

export function DataTableToolbar<TData>({
    table,
    filters,
}: DataTableToolbarProps<TData>) {
    const { addQueries, removeQueries, has } = useRouterQuery();
    const debouncedResults = useMemo(() => {
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length >= 3) {
                addQueries({ query: e.target.value, page: '1' });
            } else {
                addQueries({ query: '' });
            }
        };
        return debounce(handleChange, 300);
    }, [addQueries]);

    useEffect(() => {
        return () => debouncedResults.cancel();
    });
    //TODO: fix this. Doesnt work when selected filters are updated.
    const filterKeys = [...filters.map((filter) => filter.filter_key), 'query'];
    const isFiltered = has(filterKeys);
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Search..."
                    onChange={debouncedResults}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {filters.map((filter, index) => {
                        return (
                            <DataTableFacetedFilter
                                key={`${index}-${filter.name}`}
                                title={filter.name}
                                options={filter.options}
                                filter_key={filter.filter_key}
                            />
                        );
                    })}
                </div>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            removeQueries(filterKeys);
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <IconX className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
