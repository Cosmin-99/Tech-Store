import H from "history";
import { useHistory } from "react-router-dom";

// type OmitParameters<T> = {
//     [P in keyof T]: T[P] extends (a: infer A) => any ? (
//         A extends object ? never : P
//     ) : never
// }[keyof T]

const adminPrefix = "admin";
export const adminUrls = {
    categories: () => `/${adminPrefix}/categories`,
    categoriesAdd: () => `/${adminPrefix}/categories/add`,
    categoriesEdit: (p: { id: string }) => `/${adminPrefix}/categories/edit/${p.id}`,

    subCategories: () => `/${adminPrefix}/sub-categories`,
    subCategoryAdd: () => `/${adminPrefix}/sub-categories/add`,
    subCategoryEdit: (p: { id: number }) => `/${adminPrefix}/sub-categories/edit/${p.id}`,


    products: () => `/${adminPrefix}/products`,
    productAdd: () => `/${adminPrefix}/products/add`,
    productEdit: (p: { id: number }) => `/${adminPrefix}/products/${p.id}`,
    users: () => `/${adminPrefix}/users`,
    userAdd: () => `/${adminPrefix}/users/add`,
}

export const urls = {
    login: () => "/login",
    register: () => "/register",
    forgotPassword: () => "/reset-password",
    shop: () => "/shop",

    cart: () => `/cart`,
    checkout: () => "/checkout",
    favorite: () => "/user/favorite",
    comenzi: () => "/user/comenzi",
    orderDetails: (p: { id: string | number }) => `/user/comenzi/${p.id}`,
    userDetails: () => "/user/details",


    subcategory: (p: { id: string }) => `/shop/category/${p.id}`,
    product: (p: { id: string }) => `/shop/product/${p.id}`,
    products: (p: { subCategory: string }) => `/shop/products/${p.subCategory}`,
    userProfile: () => `/profile`,
    notFound: () => `/404ErrorPage`
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