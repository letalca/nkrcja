/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedQs } from 'qs';
import { RouteList } from './route-list';
/**
 * Marker interface to configure Ziggy's type checking behavior.
 */
export interface TypeConfig {}

/**
 * A route name registered with Ziggy.
 */
type KnownRouteName = keyof RouteList;

/**
 * A route name, or any string.
 */
type RouteName = TypeConfig extends { strictRouteNames: true }
    ? KnownRouteName
    : KnownRouteName | (string & object);
// `(string & {})` prevents TypeScript from reducing this type to just `string`,
// which would prevent intellisense from autocompleting known route names.
// See https://stackoverflow.com/a/61048124/6484459.

/**
 * Information about a single route parameter.
 */
type ParameterInfo = { name: string; required: boolean; binding?: string };

/**
 * A primitive route parameter value, as it would appear in a URL.
 */
type RawParameterValue = string | number;
// TODO: Technically booleans work too, does it make sense to add them? Here? What would that look like?

/**
 * An object parameter value containing the 'default' binding key `id`, e.g. representing an Eloquent model.
 */
type DefaultRoutable = { id: RawParameterValue } & Record<keyof any, unknown>;

/**
 * A route parameter value.
 */
type ParameterValue = RawParameterValue | DefaultRoutable;

/**
 * A parseable route parameter, either plain or nested inside an object under its binding key.
 */
type Routable<I extends ParameterInfo> = I extends { binding: string }
    ?
          | ({ [K in I['binding']]: RawParameterValue } & Record<
                keyof any,
                unknown
            >)
          | RawParameterValue
    : ParameterValue;

// Uncomment to test:
// type A = Routable<{ name: 'foo', required: true, binding: 'bar' }>;
// = RawParameterValue | { bar: RawParameterValue }
// type B = Routable<{ name: 'foo', required: true, }>;
// = RawParameterValue | DefaultRoutable

// Utility types for KnownRouteParamsObject
type RequiredParams<I extends readonly ParameterInfo[]> = Extract<
    I[number],
    { required: true }
>;
type OptionalParams<I extends readonly ParameterInfo[]> = Extract<
    I[number],
    { required: false }
>;

/**
 * An object containing a special '_query' key to target the query string of a URL.
 */
type HasQueryParam = { _query?: Record<string, unknown> };
/**
 * An object of parameters for an unspecified route.
 */
type GenericRouteParamsObject = Record<keyof any, unknown> & HasQueryParam;
// `keyof any` essentially makes it function as a plain `Record`
/**
 * An object of parameters for a specific named route.
 */
type KnownRouteParamsObject<I extends readonly ParameterInfo[]> = {
    [T in RequiredParams<I> as T['name']]: Routable<T>;
} & {
    [T in OptionalParams<I> as T['name']]?: Routable<T>;
} & GenericRouteParamsObject;
// `readonly` allows TypeScript to determine the actual values of all the
// parameter names inside the array, instead of just seeing `string`.
// See https://github.com/tighten/ziggy/pull/664#discussion_r1329978447.

// Uncomment to test:
// type A = KnownRouteParamsObject<[{ name: 'foo'; required: true }, { name: 'bar'; required: false }]>;
// = { foo: ... } & { bar?: ... }

/**
 * An object of route parameters.
 */
type RouteParamsObject<N extends RouteName> = N extends KnownRouteName
    ? KnownRouteParamsObject<RouteList[N]>
    : GenericRouteParamsObject;

/**
 * An array of parameters for an unspecified route.
 */
// TODO: this may be able to be more specific, like `Routable<ParameterInfo>[]`,
// depending how we want to handle nested objects inside parameter arrays
type GenericRouteParamsArray = unknown[];
/**
 * An array of parameters for a specific named route.
 */
type KnownRouteParamsArray<I extends readonly ParameterInfo[]> = [
    ...{ [K in keyof I]: Routable<I[K]> },
    ...unknown[],
];
// Because `K in keyof I` for a `readonly` array is always a number, even though this
// looks like `{ 0: T, 1: U, 2: V }` TypeScript generates `[T, U, V]`. The nested
// array destructing lets us type the first n items in the array, which are known
// route parameters, and then allow arbitrary additional items.
// See https://github.com/tighten/ziggy/pull/664#discussion_r1330002370.

// Uncomment to test:
// type B = KnownRouteParamsArray<[{ name: 'post'; required: true; binding: 'uuid' }]>;
// = [RawParameterValue | { uuid: RawParameterValue }, ...unknown[]]

/**
 * An array of route parameters.
 */
type RouteParamsArray<N extends RouteName> = N extends KnownRouteName
    ? KnownRouteParamsArray<RouteList[N]>
    : GenericRouteParamsArray;

/**
 * All possible parameter argument shapes for a route.
 */
type RouteParams<N extends RouteName> =
    | RouteParamsObject<N>
    | RouteParamsArray<N>;

/**
 * A route.
 */
interface Route {
    uri: string;
    methods: (
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PATCH'
        | 'PUT'
        | 'OPTIONS'
        | 'DELETE'
    )[];
    domain?: string;
    parameters?: string[];
    bindings?: Record<string, string>;
    wheres?: Record<string, unknown>;
    middleware?: string[];
}

/**
 * Ziggy's config object.
 */
interface Config {
    url: string;
    port: number | null;
    defaults: Record<string, RawParameterValue>;
    routes: Record<string, Route>;
    location?: {
        host?: string;
        pathname?: string;
        search?: string;
    };
}

/**
 * Ziggy's Router class.
 */
interface Router {
    current(): RouteName | undefined;
    current<T extends RouteName>(
        name: T,
        params?: ParameterValue | RouteParams<T>,
    ): boolean;
    get params(): Record<string, string>;
    get routeParams(): Record<string, string>;
    get queryParams(): ParsedQs;
    has<T extends RouteName>(name: T): boolean;
}