import { useContext } from 'react';
import { SearchContext, SearchProvider } from './search-provider';

const useSearch = () => {
    const searchContext = useContext(SearchContext);

    if (!searchContext) {
        throw new Error(
            'useSearch has to be used within <SearchContext.Provider>',
        );
    }

    return searchContext;
};

export { SearchProvider, useSearch };
