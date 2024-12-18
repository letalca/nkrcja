import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function handleServerError(error: unknown) {
    // eslint-disable-next-line no-console
    console.log(error);

    let errMsg = 'Something went wrong!';

    if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        Number(error.status) === 204
    ) {
        errMsg = 'Content not found.';
    }

    if (error instanceof AxiosError) {
        errMsg = error.response?.data.title;
    }
    console.log('Server error', errMsg);
    toast({ variant: 'destructive', title: errMsg });
}

export const getInitials = (name: string): string => {
    if (!name) return '';

    const nameParts = name.trim().split(' ');

    if (nameParts.length === 1) {
        return nameParts[0][0].toUpperCase();
    } else {
        const firstInitial = nameParts[0][0].toUpperCase();
        const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();
        return `${firstInitial}${lastInitial}`;
    }
};
