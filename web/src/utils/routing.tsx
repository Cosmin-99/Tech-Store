import H from "history";
import { useHistory } from "react-router-dom";

// type OmitParameters<T> = {
//     [P in keyof T]: T[P] extends (a: infer A) => any ? (
//         A extends object ? never : P
//     ) : never
// }[keyof T]

export const urls = {
    login: () => "/login",
    register: () => "/register",
    forgotPassword: () => "/reset-password",
    shop: () => "/shop",
    checkout: () => "/checkout",
    favorite: () => "/user/favorite",
    comenzi: () => "/user/comenzi",
    userDetails: () => "/user/details",


    subcategory: (p: { id: string }) => `/shop/category/${p.id}`,
    product: (p: { id: string }) => `/shop/products/${p.id}`,
    userProfile: () => `/profile`,
};

export function routeTo(p: H.History, fn: () => string): void
export function routeTo<T>(p: H.History, fn: (p: T) => string, params: T): void
export function routeTo<T>(p: H.History, fn: (p?: T) => string, params?: T) {
    p.push(fn(params));
}
export function useRouting() {
    const history = useHistory();

    function routeTo(fn: () => string): void
    function routeTo<T>(fn: (p: T) => string, params: T): void
    function routeTo<T>(fn: (p?: T) => string, params?: T) {
        history.push(fn(params));
    }
    return {
        routeTo
    }
}
export function route(fn: () => string): string
export function route<T>(fn: (p: T) => string, params: Array<keyof T>): string
export function route<T>(fn: (p: T) => string, params: Array<keyof T> = []) {
    const parameter = Object.fromEntries(params.map(p => [p, ":" + p]));
    return fn(parameter as any);
}