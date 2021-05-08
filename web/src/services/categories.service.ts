import axios, { AxiosResponse } from "axios"
import { Category } from "../models/Category";
import { endpointURL, headers } from "./config"

export const getCategories = () => {
    return axios.get<Category[]>(endpointURL + "/app/categories", { headers });
}
export const getSubcategoriesById = (id: string): Promise<AxiosResponse<{
    categoryName: string
    subcategories: Category[];
}>> => {
    return axios.get(endpointURL + `/app/sub-categories/${id}`);
}