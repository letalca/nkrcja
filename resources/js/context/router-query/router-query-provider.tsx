import { router } from '@inertiajs/react';
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

type QueryValue = string | number | boolean | null;
type QueryRecord = Record<string, QueryValue>;

interface RouterQueryContextType {
    query: QueryRecord;
    addQuery: (key: string, value: QueryValue) => void;
    addQueries: (queries: QueryRecord) => void;
    removeQuery: (key: string) => void;
    removeQueries: (keys: string[]) => void;
    getQuery: (key: string) => string;
    has: (keys: string | string[]) => boolean;
    clear: () => void;
    toggle: (key: string, value: QueryValue) => void;
}

const RouterQueryContext = createContext<RouterQueryContextType | undefined>(
    undefined,
);

interface RouterQueryProviderProps extends PropsWithChildren {
    initialQuery?: QueryRecord;
}

const RouterQueryProvider: FC<RouterQueryProviderProps> = ({
    children,
    initialQuery = {},
}) => {
    const [query, setQuery] = useState<QueryRecord>(initialQuery);

    // Parse URL parameters on mount
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const parsedQuery: QueryRecord = {};

            params.forEach((value, key) => {
                if (value.toLowerCase() === 'true') {
                    parsedQuery[key] = true;
                } else if (value.toLowerCase() === 'false') {
                    parsedQuery[key] = false;
                } else if (!isNaN(Number(value))) {
                    parsedQuery[key] = Number(value);
                } else {
                    parsedQuery[key] = value;
                }
            });

            setQuery(parsedQuery);
        } catch (error) {
            console.error('Error parsing URL parameters:', error);
        }
    }, []);

    // Memoize URL update function
    const updateUrl = useCallback((updatedQuery: QueryRecord) => {
        try {
            const url = new URL(window.location.href);
            const params = new URLSearchParams();

            Object.entries(updatedQuery).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.set(key, String(value));
                }
            });

            url.search = params.toString();

            router.visit(url.href, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        } catch (error) {
            console.error('Error updating URL:', error);
        }
    }, []);

    const getQuery = useCallback(
        (key: string): string => query[key]?.toString() ?? '',
        [query],
    );

    const addQuery = useCallback(
        (key: string, value: QueryValue) => {
            setQuery((prevQuery) => {
                const updatedQuery = { ...prevQuery, [key]: value };
                updateUrl(updatedQuery);
                return updatedQuery;
            });
        },
        [updateUrl],
    );

    const addQueries = useCallback(
        (queries: QueryRecord) => {
            setQuery((prevQuery) => {
                const updatedQuery = { ...prevQuery, ...queries };
                updateUrl(updatedQuery);
                return updatedQuery;
            });
        },
        [updateUrl],
    );

    const removeQuery = useCallback(
        (key: string) => {
            setQuery((prevQuery) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [key]: _, ...rest } = prevQuery;
                updateUrl(rest);
                return rest;
            });
        },
        [updateUrl],
    );

    const removeQueries = useCallback(
        (keys: string[]) => {
            setQuery((prevQuery) => {
                const newQuery: QueryRecord = {};
                Object.entries(prevQuery).forEach(([key, value]) => {
                    if (!keys.includes(key)) {
                        newQuery[key] = value;
                    }
                });
                updateUrl(newQuery);
                return newQuery;
            });
        },
        [updateUrl],
    );

    const clear = useCallback(() => {
        setQuery({});
        updateUrl({});
    }, [updateUrl]);

    const toggle = useCallback(
        (key: string, value: QueryValue) => {
            setQuery((prevQuery) => {
                const updatedQuery = { ...prevQuery };
                if (key in updatedQuery && updatedQuery[key] === value) {
                    delete updatedQuery[key];
                } else {
                    updatedQuery[key] = value;
                }
                updateUrl(updatedQuery);
                return updatedQuery;
            });
        },
        [updateUrl],
    );

    const has = useCallback(
        (keys: string | string[]): boolean => {
            if (Array.isArray(keys)) {
                return keys.some(
                    (key) =>
                        key in query &&
                        query[key] !== null &&
                        query[key] !== undefined &&
                        query[key] !== '',
                );
            }
            return (
                keys in query &&
                query[keys] !== null &&
                query[keys] !== undefined &&
                query[keys] !== ''
            );
        },
        [query],
    );

    const contextValue = useMemo(
        () => ({
            query,
            addQuery,
            removeQuery,
            getQuery,
            addQueries,
            has,
            removeQueries,
            clear,
            toggle,
        }),
        [
            query,
            addQuery,
            removeQuery,
            getQuery,
            addQueries,
            has,
            removeQueries,
            clear,
            toggle,
        ],
    );

    return (
        <RouterQueryContext.Provider value={contextValue}>
            {children}
        </RouterQueryContext.Provider>
    );
};

export { RouterQueryContext, RouterQueryProvider };
