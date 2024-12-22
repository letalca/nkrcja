import { router } from '@inertiajs/react'; // Adjust this import based on your routing library
import { useEffect, useState } from 'react';

export function useSearchParams() {
    const [params, setParams] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramsObject: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            paramsObject[key] = value;
        });
        return paramsObject;
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(params);
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                searchParams.delete(key);
            }
        });
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        console.log(newUrl);
        router.visit(newUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [params]);

    return {
        setParams: (kv: Record<string, string>) => {
            setParams((cur) => ({ ...cur, ...kv }));
        },
        params,
    };
}
