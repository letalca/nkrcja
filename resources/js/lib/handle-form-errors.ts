export const handleFormErrors = <T extends object>(
    errors: Record<string, string>,
    data: T,
    setError: (k: keyof T, message: string) => void,
): boolean => {
    if (typeof errors === 'object' && errors) {
        let hasErrors = false;
        Object.entries(data).forEach(([key]) => {
            if (key in errors) {
                const errorMessage = errors[key] as string;
                setError(key as keyof T, errorMessage);
                hasErrors = true;
            }
        });
        return hasErrors;
    }
    return false;
};
