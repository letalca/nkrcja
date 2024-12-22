import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { PageProps as AppPageProps } from './';
import {
    Config,
    ParameterValue,
    RouteName,
    RouteParams,
    Router,
} from './ziggy';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    export function route(): Router;

    export function route(
        name: undefined,
        params: undefined,
        absolute?: boolean,
        config?: Config,
    ): Router;

    export function route<T extends RouteName>(
        name: T,
        params?: RouteParams<T> | undefined,
        absolute?: boolean,
        config?: Config,
    ): string;

    export function route<T extends RouteName>(
        name: T,
        params?: ParameterValue | undefined,
        absolute?: boolean,
        config?: Config,
    ): string;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        className: string;
    }
}
