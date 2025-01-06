import { useEffect } from 'react';

export const useFocusOnKeyPress = (
    querySelector: string,
    key: string = 'Escape',
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === key) {
                const targetElement = document.querySelector(
                    querySelector,
                ) as HTMLElement | null;
                if (targetElement) {
                    targetElement.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, querySelector]);
};
