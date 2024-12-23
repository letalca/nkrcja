import { router } from '@inertiajs/react';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';

interface RouterQueryContextProps {
    query: Record<string, string>;
    addQuery: (key: string, value: string) => void;
    addQueries: (queries: Record<string, string>) => void;
    removeQuery: (key: string) => void;
    removeQueries: (key: string[]) => void;
    getQuery: (key: string) => string | null;
    has: (key: string | string[]) => boolean;
}

const RouterQueryContext = createContext<RouterQueryContextProps | undefined>(
    undefined,
);

export const RouterQueryProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [query, setQuery] = useState<Record<string, string>>({});
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const initialQuery: Record<string, string> = {};
        params.forEach((value, key) => {
            initialQuery[key] = value;
        });
        setQuery(initialQuery);
    }, []);

    const addQuery = (key: string, value: string) => {
        setQuery((prevQuery) => {
            const updatedQuery = { ...prevQuery, [key]: value };
            updateUrl(updatedQuery);
            return updatedQuery;
        });
    };

    const addQueries = (queries: Record<string, string>) => {
        setQuery((prevQuery) => {
            const updatedQuery = { ...prevQuery, ...queries };
            updateUrl(updatedQuery);
            return updatedQuery;
        });
    };

    const removeQuery = (key: string) => {
        setQuery((prevQuery) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _, ...rest } = prevQuery;
            updateUrl(rest);
            return rest;
        });
    };
    const removeQueries = (keys: string[]) => {
        setQuery((prevQuery) => {
            const newQuery: Record<string, string> = {};
            Object.entries(prevQuery).forEach(([k, v]) => {
                if (!keys.includes(k)) {
                    newQuery[k] = v;
                }
            });
            updateUrl(newQuery);
            return newQuery;
        });
    };

    const getQuery = (key: string): string | null => query[key] || null;

    const updateUrl = (updatedQuery: Record<string, string>) => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(updatedQuery);
        Object.entries(updatedQuery).forEach(([k, v]) => {
            if (v === null || v === undefined || v === '') {
                params.delete(k);
            }
        });
        url.search = params.toString();
        router.visit(url.href, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const has = (keys: string | string[]): boolean => {
        if (Array.isArray(keys)) {
            return keys.some((key) => key in query && query[key].length > 0);
        }
        return keys in query;
    };

    return (
        <RouterQueryContext.Provider
            value={{
                query,
                addQuery,
                removeQuery,
                getQuery,
                addQueries,
                has,
                removeQueries,
            }}
        >
            {children}
        </RouterQueryContext.Provider>
    );
};

export const useRouterQuery = (): RouterQueryContextProps => {
    const context = useContext(RouterQueryContext);
    if (!context) {
        throw new Error(
            'useRouterQuery must be used within a RouterQueryProvider',
        );
    }
    return context;
};
