import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMembershipProvider } from '@/context/membership';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from '@tabler/icons-react';

export function DataTablePagination() {
    const { paginated, pageSizes, nextPage, setPageSize } =
        useMembershipProvider();
    return (
        <div className="flex items-center justify-between overflow-auto px-2">
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                {paginated.from} - {paginated.to} of {paginated.total} Members
            </div>
            <div className="flex items-center sm:space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="hidden text-sm font-medium sm:block">
                        Rows per page
                    </p>
                    <Select
                        value={`${paginated.per_page}`}
                        onValueChange={setPageSize}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={paginated.per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizes.map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {paginated.current_page} of {paginated.last_page}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => nextPage(paginated.first_page_url)}
                        disabled={paginated.current_page === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <IconChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                            paginated.prev_page_url
                                ? nextPage(paginated.prev_page_url)
                                : null
                        }
                        disabled={!paginated.prev_page_url}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <IconChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                            paginated.next_page_url
                                ? nextPage(paginated.next_page_url)
                                : null
                        }
                        disabled={!paginated.next_page_url}
                    >
                        <span className="sr-only">Go to next page</span>
                        <IconChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => nextPage(paginated.last_page_url)}
                        disabled={
                            paginated.current_page === paginated.last_page
                        }
                    >
                        <span className="sr-only">Go to last page</span>
                        <IconChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
