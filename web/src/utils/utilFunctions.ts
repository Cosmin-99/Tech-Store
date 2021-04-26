import { User } from "../models/User";
import { headers } from "../services/config";
import { userLocalStorageKey } from "./constants";

export function getKeys<T>(p: Record<keyof T, 1>): { [P in keyof T]-?: P } {
    for (const k in p) {
        p[k] = k as any;
    }
    return p as any;
}

export function storeUserInStorage(User: User) {
    localStorage.setItem(userLocalStorageKey, JSON.stringify(User));
}

export function clearUserInStorage() {
    localStorage.removeItem(userLocalStorageKey);
    headers.Authorization = "";
}