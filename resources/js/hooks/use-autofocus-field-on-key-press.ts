import { useEffect } from 'react';

export const useAutoFocusFieldOnKeyPress = (
    selector: string,
    key: string = 'Escape',
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === key) {
                const inputField = document.querySelector(selector);
                if (inputField instanceof HTMLElement) {
                    inputField.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, selector]);
};

//
