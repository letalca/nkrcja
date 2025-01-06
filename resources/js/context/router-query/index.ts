import { useContext } from 'react';
import {
    RouterQueryContext,
    RouterQueryProvider,
} from './router-query-provider';

const useRouterQuery = () => {
    const context = useContext(RouterQueryContext);
    if (context === undefined) {
        throw new Error(
            'useRouterQuery must be used within a RouterQueryProvider',
        );
    }
    return context;
};

export { RouterQueryProvider, useRouterQuery };
