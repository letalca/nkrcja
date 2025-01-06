import { CommandMenu } from '@/components/command-menu';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { createContext, FC, PropsWithChildren, useState } from 'react';

type SearchContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(
    undefined,
);

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false);
    useKeyboardShortcut(['k'], () => setOpen((open) => !open));

    return (
        <SearchContext.Provider value={{ open, setOpen }}>
            {children}
            <CommandMenu />
        </SearchContext.Provider>
    );
};
