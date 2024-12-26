import {
    RouterQueryContext,
    RouterQueryContextProps,
} from '@/context/router-query-context';
import { useContext } from 'react';

export const useRouterQuery = (): RouterQueryContextProps => {
    const context = useContext(RouterQueryContext);
    if (!context) {
        throw new Error(
            'useRouterQuery must be used within a RouterQueryProvider',
        );
    }
    return context;
};
