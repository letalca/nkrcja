import { useEffect } from 'react';

export const useKeyboardShortcut = (keys: string[], callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (keys.includes(e.key) && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                callback();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [keys, callback]);
};
