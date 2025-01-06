import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useMembershipProvider } from '@/context/membership';
import { cn } from '@/lib/utils';
import { FilterOptions } from '@/types';
import { IconCheck, IconCirclePlus } from '@tabler/icons-react';

interface DataTableFacetedFilterProps {
    title?: string;
    options: FilterOptions[];
    filter_key: string;
}

export function DataTableFacetedFilter({
    title,
    options,
    filter_key,
}: DataTableFacetedFilterProps) {
    const { getSelectedFilters, setSelectedFilters, clearFilters } =
        useMembershipProvider();
    const selectedValues = getSelectedFilters(filter_key);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                >
                    <IconCirclePlus className="h-4 w-4" />
                    {title}
                    {selectedValues.length > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.length} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) =>
                                            selectedValues.includes(
                                                option.value.toString(),
                                            ),
                                        )
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(
                                    option.value.toString(),
                                );
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                setSelectedFilters(
                                                    filter_key,
                                                    selectedValues.filter(
                                                        (sv) =>
                                                            sv !==
                                                            option.value.toString(),
                                                    ),
                                                );
                                            } else {
                                                setSelectedFilters(filter_key, [
                                                    ...selectedValues,
                                                    option.value.toString(),
                                                ]);
                                            }
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible',
                                            )}
                                        >
                                            <IconCheck
                                                className={cn('h-4 w-4')}
                                            />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={clearFilters}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
