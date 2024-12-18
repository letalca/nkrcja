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
