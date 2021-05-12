import { AxiosError } from "axios";
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

export function isAxiosError<T>(opt: any): opt is AxiosError<T> {
    return "isAxiosError" in opt;
}

export function generateFormData<T extends Record<string, any>>(fd: FormData, values: T) {
    const { file, ...submitValues } = values;
    (Object.keys(submitValues) as any[]).forEach((key) => fd.append(key, submitValues[key].toString()))
    fd.append("image", file);
}